import { Component, OnInit } from '@angular/core';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { Statistics } from '../../core/entities/statistics';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sf-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    public statistics: Observable<Statistics>;

    constructor(protected _appStore: Store<AppState>) {
        this.statistics = this._appStore.select('storeStatistics');
    }


    ngOnInit() {
    }

}
