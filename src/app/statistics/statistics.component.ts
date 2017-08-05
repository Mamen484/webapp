import { Component, OnInit } from '@angular/core';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../core/entities/statistics';
import { environment } from '../../environments/environment';
import { ChannelStatistics } from '../core/channel-statistics';
import { ChannelService } from '../core/services/channel.service';
import { ChannelsResponse } from '../core/entities/channels-response';

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
        this.channelService.getChannels()
            .subscribe(data => this.suggestedChannels = data);
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
        this.channelService.getChannels(this.suggestedChannels.page + 1)
            .subscribe(data => {
                this.suggestedChannels.page = data.page;
                this.suggestedChannels._embedded.channel.push(...data._embedded.channel);
                this.processing = false;
            });
    }

}
