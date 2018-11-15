import { BillingStorePlatform } from './billing-store-platform.enum';

export class BillingStore {
    id?: number;
    name?: string;
    platform?: BillingStorePlatform;
    commissionRate?: number;
    trialEndsAt?: string;
    firstDayOfInvoice?: string;
    monthlySubscriptionAmount?: number;
    isActive?: boolean;
    openedAt: string;
    closedAt: string;
}
