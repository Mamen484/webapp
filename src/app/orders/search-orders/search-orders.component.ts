import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersFilter } from '../../core/entities/orders-filter';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    selector: 'sf-search-orders',
    templateUrl: './search-orders.component.html',
    styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {

    @Output() onFilter = new EventEmitter();

    searchControl = new FormControl();
    processing = false;
    filter = new OrdersFilter();

    constructor(protected dialog: MatDialog) {

    }

    ngOnInit() {
        this.searchControl.valueChanges
            .debounceTime(SEARCH_DEBOUNCE)
            .filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === '')
            .do(search => this.filter = Object.assign(new OrdersFilter(), this.filter, {search}))
            .subscribe(() => this.onFilter.emit(this.filter));
    }

    openDialog() {
        let dialogRef = this.dialog.open(OrdersFilterDialogComponent, {data: this.filter});
        dialogRef.afterClosed().subscribe((filter) => {
            if (!filter) {
                return;
            }
            this.filter = Object.assign(new OrdersFilter(), filter);
            this.onFilter.emit(filter);
        });
    }

}
