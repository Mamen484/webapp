import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemsTableComponent } from '../items-table/items-table.component';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { SelectItemsDialogComponent } from '../select-items-dialog/select-items-dialog.component';
import { cloneDeep } from 'lodash';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';

@Component({
    selector: 'sf-refund-dialog',
    templateUrl: './refund-dialog.component.html',
    styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent implements OnInit {

    @ViewChild(ItemsTableComponent, {static: true}) itemsTable: ItemsTableComponent;
    order: Order;
    refundMode: 'full' | 'selected' = 'full';

    constructor(@Inject(MAT_DIALOG_DATA) public data: Order,
                protected ordersService: OrdersService,
                protected matDialogRef: MatDialogRef<RefundDialogComponent>,
                protected snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.order = cloneDeep(this.data);
    }

    detectRefundMode() {
        this.refundMode =
            this.itemsTable.selection.selected.length === this.order.items.length && this.itemsTable.refundShipping
            || !this.itemsTable.selection.selected.length && !this.itemsTable.refundShipping
                ? 'full'
                : 'selected';
    }

    refund() {
        if (!this.itemsTable.selection.selected.length && !this.itemsTable.refundShipping && this.refundMode === 'selected' ) {
            this.snackBar.openFromComponent(SelectItemsDialogComponent, new SuccessSnackbarConfig());
            return;
        }
        this.ordersService.notifyRefund([{
            reference: this.order.reference,
            channelName: this.order._embedded.channel.name,
            refund: {
                shipping: this.itemsTable.refundShipping,
                products: this.itemsTable.selection.selected.map(item => ({
                    reference: item.reference,
                    quantity: this.itemsTable.selectedQuantity[item.reference],
                })),
            },
        }]).subscribe(() => {
            this.showSuccess();
            this.matDialogRef.close();
        }, error => this.snackBar.open(error.message, '', new ErrorSnackbarConfig()));
    }

    protected showSuccess() {
        this.snackBar.openFromComponent(OrderStatusChangedSnackbarComponent, new SuccessSnackbarConfig({data: {ordersNumber: 1, action: OrderNotifyAction.refund}}));
    }

}
