import { OrderStatus } from './order-status.enum';

export interface OrderItem {
    reference: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
    status: OrderStatus;
}
