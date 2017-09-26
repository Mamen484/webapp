import { Component, Input, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';

@Component({
    selector: 'sf-orders-filter-dialog',
    templateUrl: './orders-filter-dialog.component.html',
    styleUrls: ['./orders-filter-dialog.component.scss']
})
export class OrdersFilterDialogComponent implements OnInit {

    filter = new OrdersFilter();

    constructor() {
    }

    ngOnInit() {
    }

}
