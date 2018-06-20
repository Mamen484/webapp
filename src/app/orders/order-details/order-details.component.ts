import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../core/entities/orders/order';
import { OrderItem } from '../../core/entities/orders/order-item';
import { cloneDeep } from 'lodash';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { OrderDetailsItem } from '../../core/entities/orders/order-details-item';
import { CarrierDetailsDialogComponent } from '../carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { OrdersService } from '../../core/services/orders.service';
import { Store } from '@ngrx/store';
import { Store as UserStore } from '../../core/entities/store';
import { AppState } from '../../core/entities/app-state';
import { flatMap } from 'rxjs/operators';
import { filter } from 'rxjs/internal/operators';
import { OrderAcknowledgment } from '../../core/entities/orders/order-acknowledgment.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { ApiSpecialValue } from '../../core/entities/api-special-value.enum';

@Component({
    selector: 'sf-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    displayedColumns = ['sku', 'image', 'name', 'quantity', 'price'];
    data: MatTableDataSource<OrderDetailsItem>;
    order: Order;
    actions = OrderNotifyAction;
    acknowledgment: OrderAcknowledgment;
    errorTypes = OrderErrorType;

    constructor(protected route: ActivatedRoute,
                protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.route.data.subscribe(({order}: { order: Order }) => {
            this.order = cloneDeep(order);
            this.data = new MatTableDataSource(order.items.map((item: OrderItem) => {
                return <OrderDetailsItem>{
                    sku: item.reference,
                    name: item.name === ApiSpecialValue.absent ? '' : item.name,
                    quantity: item.quantity,
                    date: order.createdAt,
                    price: item.price,
                    image: item.image === ApiSpecialValue.absent ? '' : item.image
                }
            }));
            this.acknowledgment = this.order.acknowledgedAt
                ? OrderAcknowledgment.acknowledged
                : OrderAcknowledgment.unacknowledged;
        });
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

    cancel() {

    }

    save(valid) {
        if (!valid) {
            return;
        }
        this.appStore.select('currentStore').pipe(
            flatMap((store: UserStore) => this.ordersService.modifyOrder(
                store.id,
                this.order.id,
                {shippingAddress: this.order.shippingAddress, billingAddress: this.order.billingAddress}))).subscribe(
            () => this.showSuccess('save'),
            error => this.snackBar.open(error.message, '', {
                panelClass: 'sf-snackbar-error',
                duration: 5000,
            })
        );
    }
}
