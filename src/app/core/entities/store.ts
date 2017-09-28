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
    },
    order: {
        total: number
    };
    timeline: {
        total: number
    };
    _links: {
        self: {
            href: string
        }
    };
}
