import { Component } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../core/entities/statistics';
import { environment } from '../../environments/environment';
import { ChannelStatistics } from '../core/channel-statistics';
import { ChannelService } from '../core/services/channel.service';
import { ChannelsResponse } from '../core/entities/channels-response';
import { StoreService } from '../core/services/store.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreChannelResponse } from '../core/entities/store-channel-response';

const LOAD_CHANNELS_COUNT = 6;
const MIN_CHANNELS_DISPLAY = 16;
const MIN_SUGGESTED_CHANNELS_DISPLAY = 4;

@Component({
    selector: 'sf-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    public statistics: Statistics;
    public configuredChannels: { name: string, image: string, statistics: ChannelStatistics }[];
    public appUrl = environment.APP_URL;
    public suggestedChannels: ChannelsResponse = <any>{_embedded: {channel: []}};
    infiniteScrollDisabled = false;
    processing = false;
    processingConfigured = false;
    processingNew = false;

    storeChannelsRef: StoreChannelResponse;

    filterState = new ChannelsRequestParams();

    constructor(protected appStore: Store<AppState>, protected channelService: ChannelService, protected storeService: StoreService) {
        this.appStore.select('storeStatistics').subscribe(statistics => {
            this.statistics = statistics;

            this.appStore.select('channels').subscribe(resp => {
                this.storeChannelsRef = resp;
                this.initializeConfiguredChannels();
                this.initializeSuggestedChannels();
            });
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
                this.processingNew = true;
                this.processingConfigured = true;
                this.appStore.select('currentStore')
                    .flatMap(store => this.storeService.getAllConfiguredChannels(store.id, this.filterState))
                    .subscribe(resp => {
                        this.storeChannelsRef = resp;
                        this.processingConfigured = false;
                        this.initializeConfiguredChannels();
                        this.initializeSuggestedChannels();
                    });
        }
    }

    protected canScroll() {
        if (this.processing) {
            return false;
        }
        if (this.suggestedChannels.page === this.suggestedChannels.pages) {
            this.infiniteScrollDisabled = true;
            return false;
        }
        return true;
    }

    protected updateSuggestedChannels({page, _embedded}) {
        this.suggestedChannels.page = page;
        if (page === 1) {
            this.suggestedChannels._embedded.channel = _embedded.channel;
        } else {
            this.suggestedChannels._embedded.channel.push(..._embedded.channel);
        }
    }

    protected getFilterState() {
        return Object.assign({}, this.filterState, {
            page: this.suggestedChannels.page + 1,
            limit: LOAD_CHANNELS_COUNT
        });
    }

    protected initializeConfiguredChannels() {
        return this.configuredChannels = this.storeChannelsRef._embedded.storeChannel
            .map(storeChannel => ({
                name: storeChannel._embedded.channel.name,
                image: storeChannel._embedded.channel._links.image.href,
                statistics: this.statistics.channels.find(ch => ch.id === storeChannel.id)
            }));
    }

    protected initializeSuggestedChannels() {
        let limit = this.storeChannelsRef._embedded.storeChannel.length % MIN_CHANNELS_DISPLAY < MIN_SUGGESTED_CHANNELS_DISPLAY
            ? MIN_SUGGESTED_CHANNELS_DISPLAY
            : this.storeChannelsRef._embedded.storeChannel.length % MIN_CHANNELS_DISPLAY;

        this.channelService.getChannels(Object.assign({}, this.filterState, {limit}))
            .subscribe(data => {
                this.suggestedChannels = data;
                this.suggestedChannels.page = 0;
                this.processingNew = false;
            });
    }

}
