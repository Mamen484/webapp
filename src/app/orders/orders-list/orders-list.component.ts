import { Component, OnInit } from '@angular/core';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {

    ordersView = OrdersView;
    activeView: OrdersView;

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.activeView = params.view in this.ordersView ? Number(params.view) : OrdersView.allOrders;
        });
    }


}

