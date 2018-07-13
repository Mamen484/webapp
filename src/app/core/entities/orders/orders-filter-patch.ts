import { OrderStatus } from './order-status.enum';
import { OrderErrorType } from './order-error-type.enum';
import { OrderAcknowledgment } from './order-acknowledgment.enum';

export class OrdersFilterPatch {
    page = '1';
    status: OrderStatus = undefined;
    error: OrderErrorType = undefined;
    acknowledgment: OrderAcknowledgment = undefined;

    static get AllOrders(): OrdersFilterPatch {
        return new OrdersFilterPatch();
    }

    static get OrdersToValidate(): OrdersFilterPatch {
        let patch = new OrdersFilterPatch();
        patch.status = OrderStatus.waiting_store_acceptance;
        return patch;
    }

    static get OrdersToImport(): OrdersFilterPatch {
        let patch = new OrdersFilterPatch();
        patch.status = OrderStatus.waiting_shipment;
        patch.acknowledgment = OrderAcknowledgment.unacknowledged;
        return patch;
    }

    static get OrdersWithImportErrors() {
        let patch = new OrdersFilterPatch();
        patch.error = OrderErrorType.acknowledge;
        return patch;
    }

    static get OrdersToShip(): OrdersFilterPatch {
        let patch = new OrdersFilterPatch();
        patch.status = OrderStatus.waiting_shipment;
        return patch;
    }

    static get OrdersWithShippingErrors() {
        let patch = new OrdersFilterPatch();
        patch.error = OrderErrorType.ship;
        return patch;
    }

    static get ShippedOrders(): OrdersFilterPatch {
        let patch = new OrdersFilterPatch();
        patch.status = OrderStatus.shipped;
        return patch;
    }

}
