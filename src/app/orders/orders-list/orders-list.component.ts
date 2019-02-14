import { Component, OnInit } from '@angular/core';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {

    ordersView = OrdersView;
    activeView: OrdersView;
    storeName: string;

    constructor(protected route: ActivatedRoute, protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.activeView = params.view in this.ordersView ? Number(params.view) : OrdersView.allOrders;
        });
        this.appStore.select('currentStore').subscribe(store => this.storeName = store.name);
    }


}

