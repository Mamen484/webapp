import { FeedSource } from 'sfl-shared/entities';

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
}
