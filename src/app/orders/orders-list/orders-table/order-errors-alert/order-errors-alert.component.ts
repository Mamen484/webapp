import {Component, OnInit} from '@angular/core';
import {zip} from 'rxjs';
import {OrdersFilter} from '../../../../core/entities/orders/orders-filter';
import {OrdersView} from '../../../../core/entities/orders/orders-view.enum';
import {OrdersService} from '../../../../core/services/orders.service';

@Component({
    selector: 'sf-order-errors-alert',
    templateUrl: './order-errors-alert.component.html',
    styleUrls: ['./order-errors-alert.component.scss']
})
export class OrderErrorsAlertComponent implements OnInit {

    ordersView = OrdersView;
    shippingErrorsNumber = 0;
    importErrorsNumber = 0;

    constructor(protected ordersService: OrdersService) {
    }

    ngOnInit() {
        zip(
            this.ordersService.fetchOrdersList(OrdersFilter.getRecentByView(OrdersView.importErrors)),
            this.ordersService.fetchOrdersList(OrdersFilter.getRecentByView(OrdersView.shippingErrors)))
            .subscribe(([importErrors, shippingErrors]) => {
                this.importErrorsNumber = importErrors.total;
                this.shippingErrorsNumber = shippingErrors.total;
            });
    }

}
