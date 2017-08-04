import { Component, OnInit } from '@angular/core';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../../core/entities/statistics';
import { environment } from '../../../environments/environment';
import { ChannelStatistics } from '../../core/channel-statistics';

@Component({
    selector: 'sf-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    public statistics: Statistics;
    public channels: { name: string, image: string, statistics: ChannelStatistics }[];
    public appUrl = environment.APP_URL;

    constructor(protected _appStore: Store<AppState>) {
        this._appStore.select('storeStatistics').subscribe(statistics => {
            this.statistics = statistics;

            this._appStore.select('channels').subscribe(resp => {
                this.channels = resp._embedded.storeChannel
                    .map(storeChannel => ({
                        name: storeChannel._embedded.channel.name,
                        image: storeChannel._embedded.channel._links.image.href,
                        statistics: statistics.channels.find(ch => ch.id === storeChannel.id)
                    }))

            });
        });

    }


    ngOnInit() {
    }

}
