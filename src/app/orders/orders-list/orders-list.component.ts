import { Component, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

    filter = new OrdersFilter();

    constructor() {
    }

    ngOnInit() {
    }

}
