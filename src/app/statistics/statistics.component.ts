import { Component } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../core/entities/statistics';
import { environment } from '../../environments/environment';
import { ChannelsResponse } from '../core/entities/channels-response';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreChannel } from '../core/entities/store-channel';
import { StoreService } from '../core/services/store.service';
import { PagedResponse } from '../core/entities/paged-response';

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
    public appUrl = environment.APP_URL;
    public channels: ChannelsResponse = <any>{_embedded: {channel: []}};
    infiniteScrollDisabled = false;
    processing = false;
    processingFilters = false;
    internationalMode = false;

    filterState = new ChannelsRequestParams();

    constructor(protected appStore: Store<AppState>, protected storeService: StoreService) {
        this.appStore.select('currentStore')
            .do(() => {
                this.statistics = undefined;
                this.channels = <any>{_embedded: {channel: []}};
            })
            .flatMap(currentStore =>
                this.storeService.getStatistics(currentStore.id)
                    .zip(this.storeService.getStoreChannels(
                        currentStore.id,
                        Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT})
                    )))
            .subscribe(([statistics, channels]) => {
                this.statistics = statistics;
                this.initialize(channels);
            });
    }

    onScroll() {
        if (!this.canScroll()) {
            return;
        }
        this.processing = true;
        this.appStore.select('currentStore').take(1)
            .flatMap(store => this.storeService.getStoreChannels(store.id, this.getFilterState())).subscribe(data => {
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
                Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT})
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

    protected updateSuggestedChannels({page, pages, _embedded}: PagedResponse<{ channel: StoreChannel[] }>) {
        this.channels.page = page;
        this.channels._embedded.channel.push(..._embedded.channel.map(channel => {
            if (channel.installed) {
                let installedChannel = Object.assign({},
                    channel,
                    {statistics: this.statistics._embedded.channel.find(ch => ch.id === channel.id)}
                );
                installedChannel.statistics.currency = this.statistics.currency;
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

        this.channels = data;
        this.channels._embedded.channel.forEach(channel => {
            if (channel.installed) {
                (<StoreChannel>channel).statistics = this.statistics._embedded.channel.find(ch => ch.id === channel.id);
                (<StoreChannel>channel).statistics.currency = this.statistics.currency;
            }
        });
        this.channels.page = INITIAL_PAGES_AMOUNT;
        this.channels.pages = Math.ceil(this.channels.total / LOAD_CHANNELS_COUNT);
        this.processingFilters = false;
        this.infiniteScrollDisabled = this.channels.page >= this.channels.pages;
        this.appStore.select('currentStore').take(1).subscribe(store => {
            this.internationalMode = Boolean(this.filterState.country) && store.country !== this.filterState.country;
        })

    }

}
