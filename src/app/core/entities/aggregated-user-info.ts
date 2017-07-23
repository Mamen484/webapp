import { UserRole } from './user-role';
import { Store } from './store';

export interface AggregatedUserInfo {
    token: string;
    login: string;
    email: string,
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
}
