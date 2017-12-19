import { Component, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { MatDialogRef } from '@angular/material';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { StoreChannelDetails } from '../../core/entities/store-channel-details';

@Component({
    selector: 'sf-orders-filter-dialog',
    templateUrl: './orders-filter-dialog.component.html',
    styleUrls: ['./orders-filter-dialog.component.scss']
})
export class OrdersFilterDialogComponent implements OnInit {

    filter = new OrdersFilter();
    channels: StoreChannelDetails[];

    constructor(protected dialogRef: MatDialogRef<OrdersFilterDialogComponent>, protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.changeDate('today');
        this.appStore.select('installedChannels').subscribe(channels => this.channels = channels);
    }

    applyFilter() {
        this.dialogRef.close(this.filter);
    }

    close() {
        this.dialogRef.close(null);
    }

    changeDate(period) {
        switch (period) {
            case 'today':
                this.filter.since = OrdersFilter.aDayBefore();
                break;

            case 'week':
                this.filter.since = OrdersFilter.aWeekBefore();
                break;

            case 'month':
                this.filter.since = OrdersFilter.aMonthBefore();
                break;
        }
    }

    setSince(date) {
        this.filter.since = new Date(date);
    }

    setUntil(date) {
        this.filter.until = new Date(date);
    }
}
