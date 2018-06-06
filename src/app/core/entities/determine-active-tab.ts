import { ActiveTab } from './active-tab.enum';
import { OrderStatus } from './orders/order-status.enum';
import { OrderErrorType } from './orders/order-error-type.enum';
import { OrderAcknowledgement } from './orders/order-acknowledgement.enum';

export class DetermineActiveTab {

    static determine(status: OrderStatus, acknowledgment: OrderAcknowledgement, errorType: OrderErrorType) {
        if (status === OrderStatus.waiting_shipment && !acknowledgment) {
            return ActiveTab.toShip;
        }
        if (errorType === OrderErrorType.ship) {
            return ActiveTab.shippingErrors;
        }
        if (status === OrderStatus.waiting_shipment && acknowledgment === OrderAcknowledgement.unacknowledged) {
            return ActiveTab.toImport;
        }
        if (status === OrderStatus.waiting_store_acceptance) {
            return ActiveTab.toValidate;
        }
        if (errorType === OrderErrorType.acknowledge) {
            return ActiveTab.importErrors;
        }
        if (status === OrderStatus.shipped) {
            return ActiveTab.shipped;
        }
    }

}
