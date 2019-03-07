import { OrdersFilterPatch } from './orders-filter-patch';
import { OrdersView } from './orders-view.enum';

export const ViewToPatchMap = {
    [OrdersView.allOrders]: OrdersFilterPatch.AllOrders,
    [OrdersView.toValidate]: OrdersFilterPatch.OrdersToValidate,
    [OrdersView.toImport]: OrdersFilterPatch.OrdersToImport,
    [OrdersView.importErrors]: OrdersFilterPatch.OrdersWithImportErrors,
    [OrdersView.toShip]: OrdersFilterPatch.OrdersToShip,
    [OrdersView.shippingErrors]: OrdersFilterPatch.OrdersWithShippingErrors,
    [OrdersView.shipped]: OrdersFilterPatch.ShippedOrders,
};