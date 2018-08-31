import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { debounceTime, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { ActivatedRoute } from '@angular/router';
import { OrdersFilterPatch } from '../../core/entities/orders/orders-filter-patch';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';

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
    selectedChannel;

    constructor(protected dialog: MatDialog,
                protected ordersFilterService: OrdersFilterService,
                protected appStore: Store<AppState>,
                protected route: ActivatedRoute) {

        combineLatest(this.ordersFilterService.getFilter(), this.appStore.select('installedChannels'))
            .subscribe(([f, channels]) => {
                this.filter = f;
                this.setSelectedChannel(f, channels);
                this.searchControl.setValue(f.search, {emitEvent: false});
            });
    }

    ngOnInit() {
        this.initializeTab();
        this.ordersFilterService.patchFilter('since', OrdersFilter.aMonthBefore());
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

    protected initializeTab() {
        this.route.queryParams.subscribe(params => {
            if (params.error) {
                switch (params.error) {
                    case OrderErrorType.acknowledge:
                        this.ordersFilterService.patchFilter(OrdersFilterPatch.OrdersWithImportErrors);
                        break;

                    case OrderErrorType.ship:
                        this.ordersFilterService.patchFilter(OrdersFilterPatch.OrdersWithShippingErrors);
                        break;
                }
            }
        });
    }

    protected setSelectedChannel(f, channels) {
        try {
            this.selectedChannel = f.channel ? channels.find(ch => ch.id === f.channel).name : undefined;
        } catch (e) {
            this.selectedChannel = undefined;
        }
    }

}
