import { Component } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrdersFilterPatch } from '../../core/entities/orders/orders-filter-patch';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { DetermineActiveTab } from '../../core/entities/determine-active-tab';

@Component({
    selector: 'sf-filtering-tabs',
    templateUrl: './filtering-tabs.component.html',
    styleUrls: ['./filtering-tabs.component.scss']
})
export class FilteringTabsComponent {

    activeTab = OrdersView.allOrders;

    tabIndexMap = {
        [OrdersView.allOrders]: OrdersFilterPatch.AllOrders,
        [OrdersView.toValidate]: OrdersFilterPatch.OrdersToValidate,
        [OrdersView.toImport]: OrdersFilterPatch.OrdersToImport,
        [OrdersView.importErrors]: OrdersFilterPatch.OrdersWithImportErrors,
        [OrdersView.toShip]: OrdersFilterPatch.OrdersToShip,
        [OrdersView.shippingErrors]: OrdersFilterPatch.OrdersWithShippingErrors,
        [OrdersView.shipped]: OrdersFilterPatch.ShippedOrders,
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
