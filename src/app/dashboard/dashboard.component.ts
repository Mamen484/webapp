import { Component, OnInit } from '@angular/core';
import { Channel, ChannelStatistics, StoreChannel } from 'sfl-shared/entities';
import { DashboardDataService } from './dashboard-data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

@Component({
    selector: 'sf-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    connectedChannelsData: {
        channels: StoreChannel[],
        statistics: { [key: number]: ChannelStatistics },
        currency: string,
    };
    recommendedChannels: Channel[];
    country;
    displayRecommendedChannels = false;
    loading = true;

    constructor(private dashboardDataService: DashboardDataService,
                private appStore: Store<AppState>) {
    }

    ngOnInit(): void {
        this.appStore.select('currentStore').subscribe(store => this.country = store.country);
        this.dashboardDataService.getData().subscribe(({connectedChannelsData, connectedChannelsStatistics, recommendedChannelsList}) => {
            this.connectedChannelsData = {
                channels: connectedChannelsData.channels,
                statistics: connectedChannelsStatistics.statistics,
                currency: connectedChannelsStatistics.currency,
            };

            this.recommendedChannels = recommendedChannelsList;
            this.displayRecommendedChannels =
                Boolean(this.connectedChannelsData.channels.length <= 3 && recommendedChannelsList?.length);
            this.loading = false;
        });
    }
}
