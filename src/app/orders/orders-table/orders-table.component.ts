import { Component, OnInit } from '@angular/core';
import { TableDataSource } from '../../core/entities/table-data-source';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
    displayedColumns = ['checkbox', 'hasErrors', 'name', 'id', 'status', 'total', 'date'];
    data = new TableDataSource(Observable.of([
        {hasErrors: false, name: 'Order 1', id: '291789445236-1319635007019', status: 'Accepted', total: 34, date: '12/07/2016 14:26'},
        {hasErrors: true, name: 'Order 2', id: '1235123512341-345341234123', status: 'Delivered', total: 243, date: '12/07/2016 14:03'},
        {hasErrors: false, name: 'Order 3', id: '291789445236-1321412', status: 'Accepted', total: 34, date: '12/07/2016 14:26'},
        {hasErrors: true, name: 'Order 4', id: '1235123512341-123512341234', status: 'Delivered', total: 243, date: '12/07/2016 14:03'},
        {hasErrors: false, name: 'Order 5', id: '291789445236-23543123412', status: 'Accepted', total: 34, date: '12/07/2016 14:26'},
        {hasErrors: true, name: 'Order 6', id: '1235123512341-36431512341234', status: 'Delivered', total: 243, date: '12/07/2016 14:03'},
    ]));

    constructor() {
    }

    ngOnInit() {
    }

}
