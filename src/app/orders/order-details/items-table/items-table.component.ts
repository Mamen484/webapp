import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { OrderItem } from '../../../core/entities/orders/order-item';
import { OrderDetailsItem } from '../../../core/entities/orders/order-details-item';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { filter, flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
    selector: 'sf-items-table',
    templateUrl: './items-table.component.html',
    styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

    @Input() order: Order;
    acknowledgment: OrderAcknowledgment;
    tableData;
    displayedColumns = ['sku', 'image', 'name', 'quantity', 'price'];

    constructor(protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.initializeAcknowledgment();
        this.initializeTableData();
    }

    shipOrder() {
        this.matDialog.open(CarrierDetailsDialogComponent)
            .afterClosed().pipe(
            filter(data => Boolean(data)),
            flatMap(data => this.appStore.select('currentStore').pipe(
                flatMap(store => this.ordersService.ship(store.id, [{
                    reference: this.order.reference,
                    channelName: this.order._embedded.channel.name,
                    carrier: data.carrier,
                    trackingNumber: data.trackingNumber,
                    trackingLink: data.trackingLink
                }])))
            ))
            .subscribe(() => this.showSuccess(OrderNotifyAction.ship));
    }

    applyStatusAction(action: OrderNotifyAction) {
        if (action === OrderNotifyAction.ship) {
            this.shipOrder();
            return;
        }
        this.appStore.select('currentStore').pipe(
            flatMap(store => this.ordersService[action](store.id, [{
                reference: this.order.reference,
                channelName: this.order._embedded.channel.name,
            }]))
        ).subscribe(() => this.showSuccess(action));
    }

    protected showSuccess(action) {
        this.snackBar.openFromComponent(OrderStatusChangedSnackbarComponent, {
            duration: 2000,
            data: {ordersNumber: 1, action}
        });
    }

    protected initializeAcknowledgment() {
        this.acknowledgment = this.order.acknowledgedAt
            ? OrderAcknowledgment.acknowledged
            : OrderAcknowledgment.unacknowledged;
    }

    protected initializeTableData() {
        this.tableData = new MatTableDataSource(this.order.items.map((item: OrderItem) => {
            return <OrderDetailsItem>{
                sku: item.reference,
                name: item.name,
                quantity: item.quantity,
                date: this.order.createdAt,
                price: item.price,
                image: item.image,
            }
        }));
    }

}
