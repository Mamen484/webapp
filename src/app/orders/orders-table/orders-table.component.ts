import { Component, Input, OnInit } from '@angular/core';
import { TableDataSource } from '../../core/entities/table-data-source';
import { Observable } from 'rxjs/Observable';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersService } from '../../core/services/orders.service';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Order } from '../../core/entities/orders/order';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { Store } from '../../core/entities/store';
import { toPairs } from 'lodash';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

    @Input()
    set filter(filter: OrdersFilter) {
        if (!filter) {
            return;
        }
        this.appStore.select('currentStore').take(1)
            .flatMap(store => this.fetchData(store, filter))
            .subscribe();
    }

    optionalColumns = {
        updatedAt: false,
        productAmount: false,
        shippingAmount: false,
        paymentMethod: false,
        deliveryName: false,
        invoicingName: false,
        storeId: false,
        trackingNumber: false,
    };
    requiredColumns = ['checkbox', 'hasErrors', 'marketplace', 'reference', 'status', 'total', 'date'];
    displayedColumns = this.requiredColumns;
    data: TableDataSource;
    orderStatus = OrderStatus;

    // @TODO: set to true when server date format has no errors
    isLoadingResults = false;

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog) {
    }

    ngOnInit() {
        this.appStore.select('currentStore')
            .flatMap(store => this.fetchData(store))
            .subscribe();
    }

    protected fetchData(store: Store, filter = undefined) {
        this.isLoadingResults = true;
        return this.ordersService.fetchOrdersList(store.id, filter)
            .do(ordersPage => {
                this.isLoadingResults = false;
                this.data = new TableDataSource(Observable.of(
                    ordersPage._embedded.order.map(order => this.formatOrder(order))
                ));
            });

    }

    addLabel() {
        this.matDialog.open(LabelsDialogComponent);
    }

    formatOrder(order: Order) {
        return {
            hasErrors: false,
            channelImage: order._embedded.channel._links.image.href,
            reference: order.reference,
            id: order.id,
            status: order.status,
            total: order.payment.feedAmount,
            date: new Date(order.createdAt).getTime(),
            updatedAt: new Date(order.updatedAt).getTime(),
            productAmount: order.payment.productAmount,
            shippingAmount: order.payment.shippingAmount,
            paymentMethod: order.payment.method,
            deliveryName: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName,
            invoicingName: order.billingAddress.firstName + ' ' + order.billingAddress.lastName,
            storeId: order.storeId,
            trackingNumber: order.shipment.trackingNumber,
        }
    }

    setDisplayedColumns() {
        this.displayedColumns = this.requiredColumns
            .concat(toPairs(this.optionalColumns).reduce((acc, [key, isDisplayed]) => isDisplayed ? acc.concat(key) : acc, []));

    }

}
