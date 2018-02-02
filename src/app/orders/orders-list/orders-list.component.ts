import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';

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
            case 0: // all orders tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: undefined,
                    error: undefined,
                    acknowledgement: undefined,
                });
                break;
            case 1: // to validate tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: OrderStatus.waiting_store_acceptance,
                    error: undefined,
                    acknowledgement: undefined,
                });
                break;

            case 2: // to import tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: OrderStatus.waiting_shipment,
                    error: undefined,
                    acknowledgement: OrderAcknowledgement.unacknowledged,
                });
                break;

            case 3: // import errors tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: undefined,
                    error: OrderErrorType.acknowledge,
                    acknowledgement: undefined,
                });
                break;

            case 4: // to ship tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: OrderStatus.waiting_shipment,
                    error: undefined,
                    acknowledgement: undefined,
                });
                break;

            case 5: // shipping errors tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: undefined,
                    error: OrderErrorType.ship,
                    acknowledgement: undefined,
                });
                break;

            case 6: // shipped tab
                this.ordersFilterService.patchFilter(<OrdersFilter>{
                    status: OrderStatus.shipped,
                    error: undefined,
                    acknowledgement: undefined,
                });
                break;
        }
    }

}
