import { UserRole } from './user-role';
import { Store } from './store';
import { StoreStatus } from './store-status.enum';

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
        store: Store[]
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
     *
     * @param {string} storeName
     * @returns {Store}
     */
    hasEnabledStore(storeName?: string) {
        if (storeName) {
            return this._embedded.store.find(s => s.status !== StoreStatus.deleted && s.name === storeName);
        }
        return this._embedded.store.find(s => s.status !== StoreStatus.deleted);
    }

    findFirstEnabledStore() {
        return this._embedded.store.find(s => s.status !== StoreStatus.deleted);
    }

    findEnabledStore(name: string) {
        return this._embedded.store.find(s => s.name === name && s.status !== StoreStatus.deleted);
    }
}
