import { OrderStatus } from './order-status.enum';
import { OrderTag } from './order-tag';
import { Order } from './order';
import { ChannelMap } from '../channel-map.enum';
import { get, toLower } from 'lodash';

export class OrdersTableItem {
    hasErrors: boolean;
    channelImage: string;
    channelName: string;
    reference: string;
    id: number;
    status: OrderStatus;
    total: number;
    currency: string;
    date: number;
    updatedAt: number;
    productAmount: number;
    shippingAmount: number;
    paymentMethod: string;
    deliveryName: string;
    invoicingName: string;
    storeId: string;
    trackingNumber: string;
    imported: boolean;
    tags: OrderTag[];
    services: {
        paymentIsAfn: boolean;
        paymentIsClogistique: boolean;
        shippedByManomano: boolean;
        isAmazonPrime: boolean;
    };

    static createFromOrder(order: Order): OrdersTableItem {
        const item = new OrdersTableItem();
        const channel = order._embedded.channel;

        item.hasErrors = Boolean(order.errors && order.errors.length);
        item.channelImage = channel._links.image.href;
        item.channelName = channel.name;
        item.reference = order.reference;
        item.id = order.id;
        item.status = order.status;
        item.total = order.payment.totalAmount;
        item.currency = order.payment.currency;
        item.date = new Date(order.createdAt).getTime();
        item.updatedAt = order.updatedAt ? new Date(order.updatedAt).getTime() : undefined;
        item.productAmount = order.payment.productAmount;
        item.shippingAmount = order.payment.shippingAmount;
        item.paymentMethod = order.payment.method;
        item.deliveryName = order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName;
        item.invoicingName = order.billingAddress.firstName + ' ' + order.billingAddress.lastName;
        item.storeId = order.storeReference;
        item.trackingNumber = order.shipment.trackingNumber;
        item.imported = Boolean(order.acknowledgedAt);
        item.tags = order._embedded.tag && order._embedded.tag.length ? order._embedded.tag : [];
        item.services = OrdersTableItem.getEnabledServices(order);

        return item;
    }

    static getEnabledServices(order) {
        let services = {
            paymentIsAfn: false,
            paymentIsClogistique: false,
            shippedByManomano: false,
            isAmazonPrime: false,
        };
        const payment = get(order, ['payment', 'method'], '').toLowerCase();
        const additionalFields = order.additionalFields || {};
        switch (order._embedded.channel.id) {
            case ChannelMap.amazon:

                services.paymentIsAfn = payment === 'afn';
                services.isAmazonPrime = Boolean(additionalFields.is_prime);
                break;

            case ChannelMap.cdiscount:
                services.paymentIsClogistique = payment === 'clogistique';
                break;

            case ChannelMap.manomano:
                services.shippedByManomano = toLower(additionalFields.env) === 'epmm';
        }
        return services;
    }
}
