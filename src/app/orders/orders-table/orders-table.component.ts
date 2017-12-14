import { Component, OnInit } from '@angular/core';
import { TableDataSource } from '../../core/entities/table-data-source';
import { Observable } from 'rxjs/Observable';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersService } from '../../core/services/orders.service';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Order } from '../../core/entities/orders/order';

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

    displayedColumns = ['checkbox', 'hasErrors', 'name', 'id', 'status', 'total', 'date'];
    data: TableDataSource;

    // @TODO: set to true when server date format has no errors
    isLoadingResults = false;
    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog) {
    }

    ngOnInit() {
        this.appStore.select('currentStore')
            .flatMap(store => this.ordersService.fetchOrdersList(store.id))
            .subscribe(ordersPage => {
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
            id: order.reference,
            status: order.status,
            total: order.payment.feedAmount,
            date: order.createdAt
        }
    }

}
