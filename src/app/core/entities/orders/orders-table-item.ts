import { OrderStatus } from './order-status.enum';
import { OrderTag } from './order-tag';
import { Order } from './order';

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

    static createFromOrder(order: Order): OrdersTableItem {
        const item = new OrdersTableItem();

        item.hasErrors = Boolean(order.errors && order.errors.length);
        item.channelImage = order._embedded.channel._links.image.href;
        item.channelName = order._embedded.channel.name;
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

        return item;
    }
}
