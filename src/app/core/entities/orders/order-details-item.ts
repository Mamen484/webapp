import { OrderStatus } from './order-status.enum';

export interface OrderDetailsItem {
    /**
     * Sku can contain an OrderItem reference alias, if exists, or OrderItem reference itself
     */
    sku: string;
    name: string;
    quantity: number;
    date: string;
    taxAmount: number;
    price: number;
    image: string;
    status: OrderStatus;
    /**
     * Contains OrderItem reference
     */
    reference: string;
}
