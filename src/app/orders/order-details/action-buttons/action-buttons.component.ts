import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus } from '../../../core/entities/orders/order-status.enum';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { Order } from '../../../core/entities/orders/order';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { filter, flatMap } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';

@Component({
    selector: 'sf-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

    @Input() order: Order;

    acknowledgment: OrderAcknowledgment;
    supportsRefund = false;

    actions = OrderNotifyAction;
    statuses = OrderStatus;
    acknowledgments = OrderAcknowledgment;

    constructor(protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.initializeAcknowledgment();
        this.checkIfRefundable();
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

    openRefundDialog() {

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

    protected initializeAcknowledgment() {
        this.acknowledgment = this.order.acknowledgedAt
            ? OrderAcknowledgment.acknowledged
            : OrderAcknowledgment.unacknowledged;
    }

    protected showSuccess(action) {
        this.snackBar.openFromComponent(OrderStatusChangedSnackbarComponent, {
            duration: 2000,
            data: {ordersNumber: 1, action}
        });
    }

    protected checkIfRefundable() {
        this.supportsRefund =
            this.order._embedded.channel.name.toLowerCase() === 'laredoute'
            && this.order.status === OrderStatus.shipped;
    }

}
