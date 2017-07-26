import { Component } from '@angular/core';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { SET_STORE } from '../core/reducers/current-store';
import { INITIALIZE_USER_INFO } from '../core/reducers/user-info-reducer';
import { StoreService } from '../core/services/store.service';
import { SET_CHANNELS } from '../core/reducers/channels-reducer';

@Component({
    selector: 'app-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss']
})
export class HomepageComponent {

    constructor(protected _route: ActivatedRoute, protected _appStore: Store<AppState>, protected _storeService: StoreService) {
        this._route.data.subscribe(({userInfo}: { userInfo: AggregatedUserInfo }) => {
            this._appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
            this._appStore.select('currentStore').dispatch({type: SET_STORE, store: userInfo._embedded.store[0]});
            this._storeService.getAllConfiguredChannels(userInfo._embedded.store[0].id).subscribe(
                channels => this._appStore.select('channels').dispatch({type: SET_CHANNELS, channels})
            );
        });
    }
}
