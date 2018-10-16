import { Permission } from './permission';
import { StoreStatus } from './store-status.enum';
import { StoreOwner } from './store-owner';
import { StoreFeed } from './store-feed';
import { PaymentType } from './payment-type.enum';

const DAY = 1000 * 60 * 60 * 24;
const WEEK = 7 * DAY;

export class Store {
    id: number;
    name: string;
    status: StoreStatus;
    permission: Permission;
    owner = new StoreOwner();
    feed = new StoreFeed();
    country = '';
    createdAt: string;
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
    };

    static storeIsNew(store): boolean {
        return Boolean(store.createdAt) && new Date(store.createdAt).getTime() > (new Date().getTime() - WEEK);
    }

}
