import { Component, Input, OnInit } from '@angular/core';
import { OrdersView } from '../../../core/entities/orders/orders-view.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';

@Component({
    selector: 'sf-orders-left-nav',
    templateUrl: './orders-left-nav.component.html',
    styleUrls: ['./orders-left-nav.component.scss']
})
export class OrdersLeftNavComponent implements OnInit {

    @Input() activeMenu: 'orders' | 'settings';

    /** Active submenu for a settings menu */
    @Input() activeLink: 'test-order' | 'reporting' | 'tags-management';

    /** Active submenu for an orders menu */
    @Input() activeView: OrdersView;

    ordersView = OrdersView;
    storeName: string;

    constructor(protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.appStore.select('currentStore').subscribe(store => this.storeName = store.name);
    }

}
