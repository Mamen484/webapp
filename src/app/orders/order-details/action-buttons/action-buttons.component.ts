import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus } from '../../../core/entities/orders/order-status.enum';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { Order } from '../../../core/entities/orders/order';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { filter, flatMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { RefundDialogComponent } from '../refund-dialog/refund-dialog.component';
import { ConfirmCancellationDialogComponent } from '../../shared/confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { ChannelMap } from '../../../core/entities/channel-map.enum';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { ChannelService } from 'sfl-shared/services';

@Component({
    selector: 'sf-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

    refundableChannels = [ChannelMap.laredoute, ChannelMap.cdiscount, ChannelMap.googleshoppingactions, ChannelMap.veepeegroup];
    refundableEngines = ['zalando'];

    @Input() order: Order;

    acknowledgment: OrderAcknowledgment;
    supportsRefund = false;

    actions = OrderNotifyAction;
    statuses = OrderStatus;
    acknowledgments = OrderAcknowledgment;

    constructor(protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>,
                protected channelService: ChannelService) {
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

    cancelOrder() {
        this.matDialog.open(ConfirmCancellationDialogComponent,
            {data: {ordersNumber: 1, orderReference: this.order.reference}})
            .afterClosed().pipe(
            filter(data => Boolean(data)),
        )
            .subscribe(() => this.applyStatusAction(OrderNotifyAction.cancel));
    }

    openRefundDialog() {
        this.matDialog.open(RefundDialogComponent, {data: this.order});
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
        this.snackBar.openFromComponent(OrderStatusChangedSnackbarComponent, new SuccessSnackbarConfig({ data: {ordersNumber: 1, action}}));
    }

    protected checkIfRefundable() {
        this.channelService.fetchChannel(this.order._embedded.channel.id).subscribe(channel => {
            this.supportsRefund =
                (this.refundableChannels.includes(this.order._embedded.channel.id) || this.refundableEngines.includes(channel.engine))
                && !this.allItemsRefunded()
                && (this.order.status === OrderStatus.shipped || this.order.status === OrderStatus.partially_refunded);
        });

    }

    protected allItemsRefunded() {
        for (let item of this.order.items) {
            if (item.status !== OrderStatus.refunded) {
                return false;
            }
        }

        return true;
    }

}
