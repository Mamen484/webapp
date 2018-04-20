import { Component } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrdersFilterPatch } from '../../core/entities/orders/orders-filter-patch';

@Component({
    selector: 'sf-filtering-tabs',
    templateUrl: './filtering-tabs.component.html',
    styleUrls: ['./filtering-tabs.component.scss']
})
export class FilteringTabsComponent {

    tabIndexMap = {
        0: OrdersFilterPatch.AllOrders,
        1: OrdersFilterPatch.OrdersToValidate,
        2: OrdersFilterPatch.OrdersToImport,
        3: OrdersFilterPatch.OrdersWithImportErrors,
        4: OrdersFilterPatch.OrdersToShip,
        5: OrdersFilterPatch.OrdersWithShippingErrors,
        6: OrdersFilterPatch.ShippedOrders,
    };

    constructor(protected ordersFilterService: OrdersFilterService) {
    }

    changeTab(tab) {
        this.ordersFilterService.patchFilter(this.tabIndexMap[tab.index]);
    }

}
