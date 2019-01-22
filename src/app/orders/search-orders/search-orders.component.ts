import { Component, OnInit } from '@angular/core';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { ActivatedRoute } from '@angular/router';
import { OrdersFilterPatch } from '../../core/entities/orders/orders-filter-patch';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';

@Component({
    selector: 'sf-search-orders',
    templateUrl: './search-orders.component.html',
    styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {

    searchControlValue = '';
    processing = false;
    filter: OrdersFilter;
    selectedChannel;

    constructor(public ordersFilterService: OrdersFilterService,
                protected dialog: MatDialog,
                protected appStore: Store<AppState>,
                protected route: ActivatedRoute) {

        combineLatest(this.ordersFilterService.getFilter(), this.appStore.select('installedChannels'))
            .subscribe(([f, channels]) => {
                this.filter = f;
                this.setSelectedChannel(f, channels);
            });
    }

    ngOnInit() {
        this.initializeTab();
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
