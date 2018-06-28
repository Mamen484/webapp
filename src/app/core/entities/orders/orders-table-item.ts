import { OrderStatus } from './order-status.enum';
import { OrderTag } from './order-tag';

export interface OrdersTableItem {
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
}
