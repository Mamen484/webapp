import { Component } from '@angular/core';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss']
})
export class HomepageComponent {

    userInfo: AggregatedUserInfo;

    constructor(protected _route: ActivatedRoute) {
        this._route.data.subscribe(({userInfo}) => this.userInfo = userInfo);
    }
}
