import { Permission } from './permission';

export interface Store {
    id: number;
    name: string;
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
