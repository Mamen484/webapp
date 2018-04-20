import { Link } from '../link';
import { OrderStatus } from './order-status.enum';
import { Address } from './address';
import { Payment } from './payment';
import { Shipment } from './shipment';
import { Channel } from '../channel';
import { Store } from '../store';
import { OrderError } from './order-error';
import { OrderTag } from './order-tag';
import { OrderItem } from './order-item';

export interface Order {
    _links: {
        self: Link
    },
    id: number;
    reference: string;
    storeReference: string;
    createdAt: string;
    updatedAt: string;
    status: OrderStatus;
    storeId: number;
    shippingAddress: Address;
    billingAddress: Address;
    payment: Payment;
    shipment: Shipment;
    _embedded: {
        channel?: Channel,
        store?: Store,
        tag?: OrderTag
    },
    errors?: OrderError[];
    items?: OrderItem[];
}
