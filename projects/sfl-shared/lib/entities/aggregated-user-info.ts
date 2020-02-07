import { UserRole } from './user-role';
import { Store } from './store';
import { StoreStatus } from './store-status.enum';
import { Channel } from './channel';

export class AggregatedUserInfo {
    token: string;
    login: string;
    email: string;
    roles: UserRole[];
    language: string;
    _links: {
        self: {
            href: string
        }
    };
    _embedded: {
        account: {
            id: number,
            _links: {
                self: {
                    href: string
                }
            }
        },
        store: Store[],
        channel: Channel[],
    };

    static create(userInfo) {
        return Object.assign(new AggregatedUserInfo(), userInfo);
    }

    isAdmin() {
        return this.roles.indexOf('admin') !== -1 || this.roles.indexOf('employee') !== -1;
    }

    /**
     * If storeName specified, checks if there is an enabled store with name {storeName}.
     * Else finds the first store which status is not 'deleted'.
     */
    hasEnabledStore(storeId?: any) {
        if (storeId) {
            return Boolean(this.findEnabledStore(storeId));
        }
        return Boolean(this.findFirstEnabledStore());
    }

    findFirstEnabledStore() {
        return this._embedded.store.find(s => s.status !== StoreStatus.deleted);
    }

    findEnabledStore(id: any) {
        return this._embedded.store.find(s => s.id === Number(id) && s.status !== StoreStatus.deleted);
    }

    findFirstDemoStore() {
        return this._embedded.store.find(s => s.status === StoreStatus.demo);
    }
}
