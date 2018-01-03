export enum OrderStatus {
    created = 'created',
    waiting_store_acceptance = 'waiting_store_acceptance',
    waiting_shipment = 'waiting_shipment',
    shipped = 'shipped',
    cancelled = 'cancelled',
    refused = 'refused',
    refunded = 'refunded',
    partially_refunded = 'partially_refunded',
    partially_shipped = 'partially_shipped',
}
