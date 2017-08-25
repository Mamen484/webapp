import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { AppState } from '../core/entities/app-state';
import { SET_STORE, UPDATE_TIMELINE } from '../core/reducers/current-store-reducer';
import { INITIALIZE_USER_INFO } from '../core/reducers/user-info-reducer';
import { StoreService } from '../core/services/store.service';
import { SET_CHANNELS } from '../core/reducers/channels-reducer';
import { SET_STATISTICS } from '../core/reducers/statistics-reducer';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../core/services/user.service';

const MINUTE = 6e4;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected route: ActivatedRoute,
                protected appStore: Store<AppState>,
                protected storeService: StoreService,
                protected userService: UserService) {
        this.route.data.subscribe(this.initializeAppStore.bind(this));
        this.pollTimelineEventsChanges();
    }

    protected initializeAppStore({userInfo}: { userInfo: AggregatedUserInfo }) {
        let store = userInfo._embedded.store[0];
        this.appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
        this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
        this.storeService.getAllConfiguredChannels(store.id).subscribe(
            channels => this.appStore.select('channels').dispatch({type: SET_CHANNELS, channels})
        );
        this.storeService.getStatistics(store.id).subscribe(
            statistics => this.appStore.select('storeStatistics').dispatch({type: SET_STATISTICS, statistics})
        );
    }

    protected pollTimelineEventsChanges() {
        Observable.interval(MINUTE).flatMap(() => this.userService.fetchAggregatedInfo())
            .subscribe(userInfo => {
                this.appStore.select('currentStore').take(1).subscribe(currentStore => {
                    let timelineEvents = userInfo._embedded.store.find(store => store.id === currentStore.id).timeline.total;
                    this.appStore.dispatch({type: UPDATE_TIMELINE, timelineEvents});
                })
            })
    }
}
