import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { debounceTime, filter } from 'rxjs/operators';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    selector: 'sf-search-orders',
    templateUrl: './search-orders.component.html',
    styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {

    searchControl = new FormControl();
    processing = false;
    filter: OrdersFilter;

    constructor(protected dialog: MatDialog, protected ordersFilterService: OrdersFilterService) {
        this.ordersFilterService.getFilter().subscribe(f => {
            this.filter = f;
            this.searchControl.setValue(f.search, {emitEvent: false});
        });
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === '')
        )
            .subscribe(searchQuery => this.ordersFilterService.patchFilter('search', searchQuery));
    }

    openDialog() {
        this.dialog.open(OrdersFilterDialogComponent);
    }

    cancelFilter(filterName, filterValue) {
        this.ordersFilterService.patchFilter(filterName, filterValue);
    }

}
