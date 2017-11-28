import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from '../../core/entities/statistics';
import { ActivatedRoute } from '@angular/router';
import { AggregatedUserInfo } from '../../core/entities/aggregated-user-info';
import { LocaleIdService } from '../../core/services/locale-id.service';

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
            this.userLanguage = LocaleIdService.detectLocale((<AggregatedUserInfo>userInfo).language);
        });
    }

    ngOnInit() {
    }

}
