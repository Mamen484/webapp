import { Component } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrdersFilterPatch } from '../../core/entities/orders/orders-filter-patch';
import { ActiveTab } from '../../core/entities/orders/active-tab.enum';
import { DetermineActiveTab } from '../../core/entities/determine-active-tab';

@Component({
    selector: 'sf-filtering-tabs',
    templateUrl: './filtering-tabs.component.html',
    styleUrls: ['./filtering-tabs.component.scss']
})
export class FilteringTabsComponent {

    activeTab = ActiveTab.allOrders;

    tabIndexMap = {
        [ActiveTab.allOrders]: OrdersFilterPatch.AllOrders,
        [ActiveTab.toValidate]: OrdersFilterPatch.OrdersToValidate,
        [ActiveTab.toImport]: OrdersFilterPatch.OrdersToImport,
        [ActiveTab.importErrors]: OrdersFilterPatch.OrdersWithImportErrors,
        [ActiveTab.toShip]: OrdersFilterPatch.OrdersToShip,
        [ActiveTab.shippingErrors]: OrdersFilterPatch.OrdersWithShippingErrors,
        [ActiveTab.shipped]: OrdersFilterPatch.ShippedOrders,
    };

    constructor(protected ordersFilterService: OrdersFilterService) {
        this.ordersFilterService.getFilter().subscribe(filter => {
            this.activeTab = DetermineActiveTab.determine(filter.status, filter.acknowledgment, filter.error);
        });
    }

    changeTab(tab) {
        this.ordersFilterService.patchFilter(this.tabIndexMap[tab.index]);
    }

}
