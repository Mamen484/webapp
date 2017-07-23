import { Permission } from './permission';

export interface Store {
    id: number;
    name: string;
    permission: Permission;
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
