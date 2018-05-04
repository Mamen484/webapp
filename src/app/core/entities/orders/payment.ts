export interface Payment {
    shippingAmount: number;
    productAmount: number;
    totalAmount: number;
    currency: string;
    method: string;
}
