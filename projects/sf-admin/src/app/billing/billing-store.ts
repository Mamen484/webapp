import { BillingStorePlatform } from './billing-store-platform.enum';

export class BillingStore {
    id?: number;
    name?: string;
    platform?: BillingStorePlatform;
    commissionRate?: number;
    firstDayOfInvoice?: string;
    monthlySubscriptionAmount?: number;
    isActive?: boolean;
}
