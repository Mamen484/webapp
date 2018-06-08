import { Permission } from './permission';
import { StoreStatus } from './store-status.enum';
import { StoreOwner } from './store-owner';
import { StoreFeed } from './store-feed';
import { PaymentType } from './payment-type.enum';

export class Store {
    id: number;
    name: string;
    status: StoreStatus;
    permission: Permission;
    owner = new StoreOwner();
    feed = new StoreFeed();
    country = '';
    paymentType = PaymentType.other;
    _links: {
        self: {
            href: string
        }
    };
    _embedded: {
        order: {
            newCount: number;
        }
    }

}
