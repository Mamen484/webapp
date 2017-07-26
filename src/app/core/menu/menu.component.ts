import { Component } from '@angular/core';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '../entities/store';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_STORE } from '../reducers/current-store';
import { StoreService } from '../services/store.service';
import { SET_CHANNELS } from '../reducers/channels-reducer';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    userInfo: AppStore<AggregatedUserInfo>;
    currentStore: AppStore<Store>;

    appUrl = environment.APP_URL;

    constructor(protected _appStore: AppStore<AppState>, protected _storeService: StoreService) {
        this.userInfo = this._appStore.select('userInfo');
        this.currentStore = this._appStore.select('currentStore');
    }

    chooseStore(store) {
        this.currentStore.dispatch({type: SET_STORE, store});
        this._storeService.getAllConfiguredChannels(store.id).subscribe(channels =>
            this._appStore.select('channels').dispatch({type: SET_CHANNELS, channels}));
    }
}
