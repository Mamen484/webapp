import { OrdersView } from './orders/orders-view.enum';
import { OrderStatus } from './orders/order-status.enum';
import { OrderErrorType } from './orders/order-error-type.enum';
import { OrderAcknowledgment } from './orders/order-acknowledgment.enum';

export class DetermineActiveTab {

    static determine(status: OrderStatus, acknowledgment: OrderAcknowledgment, errorType: OrderErrorType) {
        if (status === OrderStatus.waiting_shipment && !acknowledgment && !errorType) {
            return OrdersView.toShip;
        }
        if (errorType === OrderErrorType.ship) {
            return OrdersView.shippingErrors;
        }
        if (status === OrderStatus.waiting_shipment && acknowledgment === OrderAcknowledgment.unacknowledged && !errorType) {
            return OrdersView.toImport;
        }
        if (status === OrderStatus.waiting_store_acceptance) {
            return OrdersView.toValidate;
        }
        if (errorType === OrderErrorType.acknowledge) {
            return OrdersView.importErrors;
        }
        if (status === OrderStatus.shipped) {
            return OrdersView.shipped;
        }
    }

}
