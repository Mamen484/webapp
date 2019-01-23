import { BillingStore } from '../store-list/billing-store';

export class BillingGroup {
    id?: number;
    name?: string;
    _embedded: { store: BillingStore[] };
}
