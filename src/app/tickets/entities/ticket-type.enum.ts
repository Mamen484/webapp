export enum TicketType {
    acknowledgeOrder = 'order.acknowledge',
    unacknowledgeOrder = 'order.unacknowledge',
    refuseOrder = 'order.notify.refusal',
    shipOrder = 'order.notify.shipment',
    cancelOrder = 'order.notify.cancellation',
    acceptOrder = 'order.notify.acceptance',
    refundorder = 'order.notify.refund',
}
