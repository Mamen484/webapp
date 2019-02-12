export enum TicketType {
    acknowledgeOrder = 'order.acknowledge',
    unacknowledgeOrder = 'order.unacknowledge',
    refuseOrder = 'order.notify.refusal',
    shipOrder = 'order.notify.shipment',
    cancelOrder = 'order.notify.cancellation',
    acceptOrder = 'order.notify.acceptance',
    refundOrder = 'order.notify.refund',

    /* To request only tickets with a type that contains this string */
    default = 'order',
}
