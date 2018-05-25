import { Component, Inject, OnInit } from '@angular/core';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sf-select-orders-dialog',
    templateUrl: './select-orders-dialog.component.html',
    styleUrls: ['./select-orders-dialog.component.scss']
})
export class SelectOrdersDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public action: OrderNotifyAction) {
    }

    ngOnInit() {
    }

}
