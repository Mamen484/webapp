import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from '../../core/entities/statistics';
import { ActivatedRoute } from '@angular/router';
import { AggregatedUserInfo } from 'sfl-shared/src/lib/core/entities';
import { SflLocaleIdService } from 'sfl-shared';
import { ChannelLanguage } from '../../core/entities/channel-language.enum';

@Component({
    selector: 'sf-store-statistics',
    templateUrl: './store-statistics.component.html',
    styleUrls: ['./store-statistics.component.scss']
})
export class StoreStatisticsComponent implements OnInit {

    @Input() statistics: Statistics;
    userLanguage: AggregatedUserInfo;

    constructor(protected route: ActivatedRoute) {
        this.route.parent.parent.data.subscribe(({userInfo}) => {
            this.userLanguage = SflLocaleIdService.detectLocale((<AggregatedUserInfo>userInfo).language, ChannelLanguage);
        });
    }

    ngOnInit() {
    }

}
