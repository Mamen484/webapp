import { FeedSource } from 'sfl-shared/entities';
import { BillingGroup } from '../group-list/billing-group';

export class BillingStore {
    id?: number;
    name?: string;
    platform?: FeedSource;
    commissionRate?: number;
    trialEndsAt?: string;
    monthlySubscriptionAmount?: number;
    isActive?: boolean;
    openedAt?: string;
    closedAt?: string;
    _embedded: {
        group: BillingGroup,
    };
}
