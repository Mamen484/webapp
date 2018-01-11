import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {

    filter: OrdersFilter;

    constructor(protected ordersFilterService: OrdersFilterService) {
    }

    ngOnInit() {
    }

    changeTab(tab) {
        switch (tab.index) {
            case 0:
                this.ordersFilterService.patchFilter('status', undefined);
                break;

            case 1:
                this.ordersFilterService.patchFilter('status', OrderStatus.waiting_store_acceptance);
                break;

            case 3:
                this.ordersFilterService.getFilter().take(1).subscribe(filter => {
                    filter.status = undefined;
                    filter.errorType = OrderErrorType.import;
                    this.ordersFilterService.setFilter(filter);
                });
                break;

            case 4:
                this.ordersFilterService.patchFilter('status', OrderStatus.waiting_shipment);
                break;

            case 5:
                this.ordersFilterService.getFilter().take(1).subscribe(filter => {
                    filter.status = undefined;
                    filter.errorType = OrderErrorType.ship;
                    this.ordersFilterService.setFilter(filter);
                });
                break;

            case 6:
                this.ordersFilterService.patchFilter('status', OrderStatus.shipped);
                break;
        }
    }

}
