export interface StoreCharge {
    charge: {
        amount: number;
        currency: string;
    };
    references: {
        count: number;
    };
    premiumChannels: {
        count: number;
    };
    pricing: {
        monthlyAmount: {
            value: number;
            currency: string;
        },
        commission: {
            coefficient: number;
        },
        trialPeriod: {
            endAt: string;
        }
    };
}
