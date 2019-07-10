import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';

@Component({
    selector: 'sf-order-status-changed-snackbar',
    templateUrl: './order-status-changed-snackbar.component.html',
    styleUrls: ['./order-status-changed-snackbar.component.scss']
})
export class OrderStatusChangedSnackbarComponent implements OnInit {

    ordersNumber;
    action: OrderNotifyAction;
    actions = OrderNotifyAction;

    constructor(@Inject(MAT_SNACK_BAR_DATA) {ordersNumber, action}: { ordersNumber: number, action: OrderNotifyAction}) {
        this.ordersNumber = ordersNumber;
        this.action = action;
    }

    ngOnInit() {
    }


}
