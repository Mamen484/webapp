import { Component, Inject, OnInit } from '@angular/core';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'sf-select-orders-dialog',
    templateUrl: './select-orders-dialog.component.html',
    styleUrls: ['./select-orders-dialog.component.scss']
})
export class SelectOrdersDialogComponent implements OnInit {

    actions = OrderNotifyAction;

    constructor(@Inject(MAT_DIALOG_DATA) public action: OrderNotifyAction | 'export' | 'assignTags') {
    }

    ngOnInit() {
    }

}
