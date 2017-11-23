import { Permission } from './permission';
import { StoreStatus } from './store-status.enum';
import { StoreOwner } from './store-owner';
import { CreateStoreFeed } from './create-store-feed';

export class Store {
    id: number;
    name: string;
    status: StoreStatus;
    permission: Permission;
    owner = new StoreOwner();
    feed = new CreateStoreFeed();
    country = '';
    order: {
        total: number
    };
    _links: {
        self: {
            href: string
        }
    };
    _embedded: {
        order: {newCount: number};
    };

    create() {

    }
}
