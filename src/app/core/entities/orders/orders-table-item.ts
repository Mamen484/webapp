import { OrderStatus } from './order-status.enum';

export interface OrdersTableItem {
    hasErrors: boolean;
    channelImage: string;
    channelName: string;
    reference: string;
    id: number;
    status: OrderStatus;
    total: number;
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
}
