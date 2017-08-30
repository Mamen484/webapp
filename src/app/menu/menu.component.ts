import { Component } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { toPairs } from 'lodash';

import { AppState } from '../core/entities/app-state';
import { StoreService } from '../core/services/store.service';
import { environment } from '../../environments/environment';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { Store } from '../core/entities/store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    userInfo: AggregatedUserInfo;
    currentStore: Store;

    appUrl = environment.APP_URL;

    constructor(protected _appStore: AppStore<AppState>,
                protected _storeService: StoreService) {
        this._appStore.select('userInfo').subscribe(userInfo => this.userInfo = userInfo);
        this._appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    chooseStore(store) {
        this._appStore.select('currentStore').dispatch({type: SET_STORE, store});
        this._storeService.getAllConfiguredChannels(store.id).subscribe(channels =>
            this._appStore.select('channels').dispatch({type: SET_CHANNELS, channels}));
    }
}
