import { Component, Inject, OnInit } from '@angular/core';
import { DAY, OrdersFilter } from '../../core/entities/orders/orders-filter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Channel, ChannelType } from 'sfl-shared/entities';
import { Tag } from '../../core/entities/tag';

@Component({
    selector: 'sf-orders-filter-dialog',
    templateUrl: './orders-filter-dialog.component.html',
    styleUrls: ['./orders-filter-dialog.component.scss']
})
export class OrdersFilterDialogComponent implements OnInit {

    channels: Channel[];
    dateOption = 'anytime';
    tags: Tag[];

    constructor(protected dialogRef: MatDialogRef<OrdersFilterDialogComponent, OrdersFilter>,
                protected appStore: Store<AppState>,
                @Inject(MAT_DIALOG_DATA) public filter: OrdersFilter) {

    }

    ngOnInit() {
        if (!this.filter.since) {
            this.changeDate('anytime');
        } else {
            this.dateOption = 'custom';
        }

        this.appStore.select('installedChannels').subscribe(channels =>
            this.channels = channels
                ? channels.filter(channel => channel._embedded.channel.type === ChannelType.marketplace.toLowerCase())
                    .map(channel => channel._embedded.channel)
                : []
        );
        this.appStore.select('tags').subscribe(tags => this.tags = tags);
    }

    applyFilter() {
        this.dialogRef.close(this.filter);
    }

    close() {
        this.dialogRef.close();
    }

    changeDate(period) {
        switch (period) {
            case 'today':
                this.filter.since = OrdersFilter.aDayBefore();
                delete this.filter.until;
                break;

            case 'yesterday':
                this.filter.since = OrdersFilter.subtractFromTheDate(OrdersFilter.aDayBefore(), DAY);
                this.filter.until = OrdersFilter.subtractFromTheDate(OrdersFilter.aDayBefore(), 1);
                break;

            case 'week':
                this.filter.since = OrdersFilter.aWeekBefore();
                delete this.filter.until;
                break;

            case 'month':
                this.filter.since = OrdersFilter.aMonthBefore();
                delete this.filter.until;
                break;

            case 'currentMonth':
                this.filter.since = OrdersFilter.currentMonth();
                delete this.filter.until;
                break;

            case 'anytime':
                delete this.filter.since;
                delete this.filter.until;
        }
    }

    setSince(date) {
        this.filter.since = new Date(date);
    }

    setUntil(date) {
        this.filter.until = new Date(date);
    }
}
