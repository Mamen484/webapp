import { Component } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store as AppStore } from '@ngrx/store';
import { Store } from '../core/entities/store';
import { Statistics } from '../core/entities/statistics';
import { ChannelsResponse } from '../core/entities/channels-response';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreChannel } from '../core/entities/store-channel';
import { StoreService } from '../core/services/store.service';
import { PagedResponse } from '../core/entities/paged-response';
import { MatDialog } from '@angular/material';
import { NoChannelsDialogComponent, SCHEDULE_A_CALL } from './no-channels-dialog/no-channels-dialog.component';
import { ScheduleCallDialogComponent } from './schedule-call-dialog/schedule-call-dialog.component';
import { StoreCharge } from '../core/entities/store-charge';
import { cloneDeep } from 'lodash';

const LOAD_CHANNELS_COUNT = 6;
/**
 * load pages on page initialization
 * @type {number}
 */
const INITIAL_PAGES_AMOUNT = 3;

@Component({
    selector: 'sf-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    public statistics: Statistics;
    public channels: ChannelsResponse = <any>{_embedded: {channel: []}};
    infiniteScrollDisabled = false;
    processing = false;
    processingFilters = false;
    internationalMode = false;
    filterState = new ChannelsRequestParams();
    haveNoChannels = false;
    charge: StoreCharge;
    hasStatisticsPermission = false;

    constructor(protected appStore: AppStore<AppState>, protected storeService: StoreService, protected dialog: MatDialog) {

        this.appStore.select('currentStore')
            .do(() => this.displayPageLoading())
            .do((currentStore: Store) => this.hasStatisticsPermission = Boolean(currentStore.permission.statistics))
            .flatMap(currentStore => this.fetchData(currentStore))
            .subscribe(([[statistics, channels], charge]) => {
                this.statistics = statistics;
                this.initialize(channels);
                this.processing = false;
                this.charge = charge;

                this.appStore.select('currentStore').take(1).subscribe(currentStore => {
                    if (currentStore.feed.source === 'Shopify' && !channels._embedded.channel.filter(ch => ch.installed).length) {
                        this.haveNoChannels = true;
                        this.showNoChannelsDialog();
                    }
                })
            });
    }


    onScroll() {
        if (!this.canScroll()) {
            return;
        }
        this.processing = true;
        this.appStore.select('currentStore').take(1)
            .flatMap(store => this.storeService.getStoreChannels(
                store.id,
                this.getFilterState(),
                this.isForeignCountry(store.country)
            )).subscribe(data => {
            this.updateSuggestedChannels(data);
            this.processing = false;
            this.infiniteScrollDisabled = data.page >= data.pages;
        });
    }

    onApplyFilter() {
        this.processingFilters = true;
        this.appStore.select('currentStore').take(1)
            .flatMap(currentStore => this.storeService.getStoreChannels(
                currentStore.id,
                Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT}),
                this.isForeignCountry(currentStore.country)
            ))
            .subscribe(channels => this.initialize(channels));
    }

    resetFilter() {
        this.filterState = new ChannelsRequestParams();
        this.onApplyFilter();
        return false;
    }

    protected canScroll() {
        return !this.processing && this.channels.page < this.channels.pages;
    }

    protected isForeignCountry(country) {
        return Boolean(this.filterState.country && country.toLowerCase() !== this.filterState.country.toLowerCase());
    }

    protected updateSuggestedChannels({page, _embedded}: PagedResponse<{ channel: StoreChannel[] }>) {
        this.channels.page = page;
        this.channels._embedded.channel.push(..._embedded.channel.map((channel: StoreChannel) => {
            if (channel.installed) {
                let installedChannel = Object.assign({},
                    channel,
                    {statistics: this.statistics._embedded.channel.find(ch => ch.id === channel.id)}
                );
                if (installedChannel.statistics) {
                    installedChannel.statistics.currency = this.statistics.currency;
                }
                return installedChannel;
            }
            return channel;
        }));

    }

    protected getFilterState() {
        return Object.assign({}, this.filterState, {
            page: this.channels.page + 1,
            limit: LOAD_CHANNELS_COUNT
        });
    }

    protected initialize(data) {

        this.channels = cloneDeep(data);
        this.channels._embedded.channel.forEach((channel: StoreChannel) => {
            if (channel.installed) {
                channel.statistics = this.statistics._embedded.channel.find(ch => ch.id === channel.id);
                if (channel.statistics) {
                    channel.statistics.currency = this.statistics.currency;
                }
            }
        });
        this.channels.page = INITIAL_PAGES_AMOUNT;
        this.channels.pages = Math.ceil(this.channels.total / LOAD_CHANNELS_COUNT);
        this.processingFilters = false;
        this.infiniteScrollDisabled = this.channels.page >= this.channels.pages;
        this.appStore.select('currentStore').take(1).subscribe((store: Store) => {
            this.internationalMode = this.isForeignCountry(store.country);
        })

    }

    protected showNoChannelsDialog() {
        this.dialog.open(NoChannelsDialogComponent).afterClosed().subscribe(action => {
            switch (action) {
                case SCHEDULE_A_CALL:
                    this.dialog.open(ScheduleCallDialogComponent);
            }
        });
    }

    protected displayPageLoading() {
        this.statistics = undefined;
        this.channels = <any>{_embedded: {channel: []}};
        this.processing = true;
    }

    protected fetchData(currentStore) {
        return this.storeService.getStatistics(currentStore.id)
            .zip(this.storeService.getStoreChannels(
                currentStore.id,
                Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT})
            ))
            .zip(this.storeService.getStoreCharge(currentStore.id))
    }
}
