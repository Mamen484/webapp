import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ItemsTableComponent } from '../items-table/items-table.component';
import { OrdersService } from '../../../core/services/orders.service';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { SelectItemsDialogComponent } from '../select-items-dialog/select-items-dialog.component';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'sf-refund-dialog',
    templateUrl: './refund-dialog.component.html',
    styleUrls: ['./refund-dialog.component.scss']
})
export class RefundDialogComponent implements OnInit {

    @ViewChild(ItemsTableComponent) itemsTable: ItemsTableComponent;
    order: Order;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Order,
                protected ordersService: OrdersService,
                protected matDialogRef: MatDialogRef<RefundDialogComponent>,
                protected snackBar: MatSnackBar,
    ) {
        this.order = cloneDeep(this.data);
    }

    ngOnInit() {
    }

    refund() {
        if (!this.itemsTable.selection.selected.length && !this.itemsTable.refundShipping) {
            this.snackBar.openFromComponent(SelectItemsDialogComponent, {
                duration: 5000
            });
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
        this.snackBar.openFromComponent(OrderStatusChangedSnackbarComponent, {
            duration: 2000,
            data: {ordersNumber: 1, action: OrderNotifyAction.refund},
        });
    }

}
