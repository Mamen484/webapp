import { Component } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { toPairs } from 'lodash';

import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { Store } from '../core/entities/store';
import { SET_STORE } from '../core/reducers/current-store-reducer';
import { WindowRefService } from '../core/services/window-ref.service';
import { LegacyLinkService } from '../core/services/legacy-link.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    userInfo: AggregatedUserInfo;
    currentStore: Store;

    appUrl = environment.APP_URL;


    constructor(protected appStore: AppStore<AppState>,
                protected windowRef: WindowRefService,
                protected legacyLinkService: LegacyLinkService) {
        this.appStore.select('userInfo').subscribe(userInfo => this.userInfo = userInfo);
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    chooseStore(store) {
        this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
    }

    logout() {
        this.windowRef.nativeWindow.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${this.appUrl}/index/logout`;
    }

    goToLegacy(path) {
        this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(path);
    }
}
