export interface Payment {
    shippingAmount: number;
    productAmount: number;
    feedAmount: number;
    currency: string;
    method: string;
}
