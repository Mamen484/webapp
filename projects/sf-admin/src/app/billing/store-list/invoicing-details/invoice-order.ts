export class InvoiceOrder {
    channelName: string;
    reference: string;
    payment: {
        totalAmount: number;
        commissionedAmount: number;
        currency: string;
    }
}
