export class TestOrder {
    channel: number;
    shipment: {
        carrier?: string,
        relayNumber?: number,
        shippingAmount?: number,
        paymentMethod?: string,
    } = {};
    items: { reference: string, price: number, quantity?: number }[] = [];
}
