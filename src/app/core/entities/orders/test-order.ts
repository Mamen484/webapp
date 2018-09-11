export class TestOrder {
    channelId: number;
    shipment: {
        carrier?: string,
        trackingNumber?: number,
    } = {};
    payment: {
        shippingAmount?: number,
        currency?: string,
        method?: string,
    } = {};
    items: { reference: string, price: number, quantity?: number }[] = [];
}
