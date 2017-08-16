import { Component } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../core/entities/statistics';
import { environment } from '../../environments/environment';
import { ChannelService } from '../core/services/channel.service';
import { ChannelsResponse } from '../core/entities/channels-response';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreChannel } from '../core/entities/store-channel';

const LOAD_CHANNELS_COUNT = 6;
/**
 * load pages on page initizalize
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

    filterState = new ChannelsRequestParams();

    constructor(protected appStore: Store<AppState>, protected channelService: ChannelService) {
        this.appStore.select('storeStatistics').subscribe(statistics => {
            this.statistics = statistics;
            this.initialize();
        });
    }

    onScroll() {
        if (!this.canScroll()) {
            return;
        }

        this.processing = true;
        this.channelService.getChannels(this.getFilterState()).subscribe(data => {
            this.updateSuggestedChannels(data);
            this.processing = false;
        });
    }

    onApplyFilter({type, data}) {
        switch (type) {
            default:
                this.filterState.searchQuery = data;
                this.processingFilters = true;
                this.initialize();
        }
    }

    protected canScroll() {
        if (this.processing) {
            return false;
        }
        if (this.channels.page === this.channels.pages) {
            this.infiniteScrollDisabled = true;
            return false;
        }
        return true;
    }

    protected updateSuggestedChannels({page, _embedded}) {
        this.channels.page = page;
        this.channels._embedded.channel.push(..._embedded.channel);

    }

    protected getFilterState() {
        return Object.assign({}, this.filterState, {
            page: this.channels.page + 1,
            limit: LOAD_CHANNELS_COUNT
        });
    }

    protected initialize() {

        this.channelService.getChannels(Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT}))
            .subscribe(data => {
                this.channels = data;
                this.channels._embedded.channel.forEach(channel => {
                    if (channel.isConfigured) {
                        (<StoreChannel>channel).statistics = this.statistics.channels.find(ch => ch.id === channel.id)
                    }
                });
                this.channels.page = INITIAL_PAGES_AMOUNT;
                this.channels.pages = Math.floor(this.channels.total / LOAD_CHANNELS_COUNT);
                this.processingFilters = false;
            });
    }

}
