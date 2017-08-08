import { Component } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../core/entities/statistics';
import { environment } from '../../environments/environment';
import { ChannelStatistics } from '../core/channel-statistics';
import { ChannelService } from '../core/services/channel.service';
import { ChannelsResponse } from '../core/entities/channels-response';

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
    public suggestedChannels: ChannelsResponse;
    infiniteScrollDisabled = false;
    processing = false;

    constructor(protected appStore: Store<AppState>, protected channelService: ChannelService) {
        this.appStore.select('storeStatistics').subscribe(statistics => {
            this.statistics = statistics;
            this.initializeConfiguredChannels(statistics);
            this.initializeSuggestedChannels();
        });
    }

    protected initializeConfiguredChannels(statistics) {
        this.appStore.select('channels').subscribe(resp => {
            this.configuredChannels = resp._embedded.storeChannel
                .map(storeChannel => ({
                    name: storeChannel._embedded.channel.name,
                    image: storeChannel._embedded.channel._links.image.href,
                    statistics: statistics.channels.find(ch => ch.id === storeChannel.id)
                }));
        });
    }

    protected initializeSuggestedChannels() {
        this.appStore.select('channels').subscribe(resp => {
            let limit = resp._embedded.storeChannel.length % MIN_CHANNELS_DISPLAY < MIN_SUGGESTED_CHANNELS_DISPLAY
                ? 4
                : resp._embedded.storeChannel.length % MIN_CHANNELS_DISPLAY;

            this.channelService.getChannels({limit})
                .subscribe(data => {
                    this.suggestedChannels = data;
                    this.suggestedChannels.page = 0;
                });
        });
    }


    onScroll() {
        if (this.processing) {
            return;
        }
        if (this.suggestedChannels.page === this.suggestedChannels.pages) {
            this.infiniteScrollDisabled = true;
            return;
        }
        this.processing = true;
        this.channelService.getChannels({page: this.suggestedChannels.page + 1, limit: LOAD_CHANNELS_COUNT})
            .subscribe(data => {
                this.suggestedChannels.page = data.page;
                if (data.page === 1) {
                    this.suggestedChannels._embedded.channel = data._embedded.channel;
                } else {
                    this.suggestedChannels._embedded.channel.push(...data._embedded.channel);
                }
                this.processing = false;
            });
    }

}
