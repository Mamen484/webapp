import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

    constructor(protected ordersFilterService: OrdersFilterService) {
    }

    ngOnInit() {
    }

    changeTab(tab) {
        switch (tab.index) {
            case 0:
                this.ordersFilterService.patchFilter({status: undefined, errorType: undefined});
                break;

            case 1:
                this.ordersFilterService.patchFilter({status: OrderStatus.waiting_store_acceptance, errorType: undefined});
                break;

            case 3:
                this.ordersFilterService.patchFilter({status: undefined, errorType: OrderErrorType.import});
                break;

            case 4:
                this.ordersFilterService.patchFilter({status: OrderStatus.waiting_shipment, errorType: undefined});
                break;

            case 5:
                this.ordersFilterService.patchFilter({status: undefined, errorType: OrderErrorType.ship});
                break;

            case 6:
                this.ordersFilterService.patchFilter({status: OrderStatus.shipped, errorType: undefined});
                break;
        }
    }

}
