import { Component, Inject, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
    dateOption = 'today';

    constructor(protected dialogRef: MatDialogRef<OrdersFilterDialogComponent>,
                protected appStore: Store<AppState>,
                @Inject(MAT_DIALOG_DATA) protected data) {
        this.filter = Object.assign(new OrdersFilter(), data);
    }

    ngOnInit() {
        if (!this.filter.since) {
            this.changeDate('today');
        } else {
            this.dateOption = 'custom';
        }

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
                delete this.filter.until;
                break;

            case 'week':
                this.filter.since = OrdersFilter.aWeekBefore();
                delete this.filter.until;
                break;

            case 'month':
                this.filter.since = OrdersFilter.aMonthBefore();
                delete this.filter.until;
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
