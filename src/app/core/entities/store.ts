import { Permission } from './permission';
import { StoreStatus } from './store-status.enum';

export interface Store {
    id: number;
    name: string;
    status: StoreStatus;
    permission: Permission;
    country: string;
    feed: {
        source: 'Shopify' | 'Prestashop',
        url: string
    };
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
