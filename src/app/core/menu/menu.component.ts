import { Component, EventEmitter, Output } from '@angular/core';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '../entities/store';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_STORE } from '../reducers/current-store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    userInfo: AppStore<AggregatedUserInfo>;
    currentStore: AppStore<Store>;

    constructor(protected _appStore: AppStore<AppState>) {
        this.userInfo = this._appStore.select('userInfo');
        this.currentStore = this._appStore.select('currentStore');
    }

    chooseStore(store) {
        this.currentStore.dispatch({type: SET_STORE, store});
    }
}
