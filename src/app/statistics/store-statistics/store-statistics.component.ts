import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from 'sfl-shared/entities';
import { ActivatedRoute } from '@angular/router';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { SflLocaleIdService } from 'sfl-shared/services';
import { ChannelLanguage } from '../../core/entities/channel-language.enum';

@Component({
    selector: 'sf-store-statistics',
    templateUrl: './store-statistics.component.html',
    styleUrls: ['./store-statistics.component.scss']
})
export class StoreStatisticsComponent implements OnInit {

    @Input() statistics: Statistics;
    userLanguage: string;

    constructor(protected route: ActivatedRoute) {
        this.route.parent.parent.data.subscribe(({userInfo}) => {
            this.userLanguage = SflLocaleIdService.detectLocale((<AggregatedUserInfo>userInfo).language, ChannelLanguage);
        });
    }

    ngOnInit() {
    }

}
