import { Component, OnInit } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { MatDialogRef } from '@angular/material';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { StoreChannelDetails } from '../../core/entities/store-channel-details';
import { Tag } from '../../core/entities/tag';
import { OrdersFilterService } from '../../core/services/orders-filter.service';

@Component({
    selector: 'sf-orders-filter-dialog',
    templateUrl: './orders-filter-dialog.component.html',
    styleUrls: ['./orders-filter-dialog.component.scss']
})
export class OrdersFilterDialogComponent implements OnInit {

    filter = new OrdersFilter();
    channels: StoreChannelDetails[];
    dateOption = 'anytime';
    tags: Tag[];

    constructor(protected dialogRef: MatDialogRef<OrdersFilterDialogComponent>,
                protected appStore: Store<AppState>,
                protected ordersFilterService: OrdersFilterService) {
        this.ordersFilterService.getFilter().take(1).subscribe(filter => {
            this.filter = Object.assign(new OrdersFilter(), filter)
        });
    }

    ngOnInit() {
        if (!this.filter.since) {
            this.changeDate('anytime');
        } else {
            this.dateOption = 'custom';
        }

        this.appStore.select('installedChannels').subscribe(channels => this.channels = channels);
        this.appStore.select('tags').subscribe(tags => this.tags = tags);
    }

    applyFilter() {
        this.ordersFilterService.setFilter(this.filter);
        this.dialogRef.close();
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

            case 'week':
                this.filter.since = OrdersFilter.aWeekBefore();
                delete this.filter.until;
                break;

            case 'month':
                this.filter.since = OrdersFilter.aMonthBefore();
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
