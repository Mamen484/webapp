import { Component, Inject, LOCALE_ID } from '@angular/core';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { Store } from '../core/entities/store';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { SET_STORE } from '../core/reducers/current-store';
import { StoreService } from '../core/services/store.service';
import { SET_CHANNELS } from '../core/reducers/channels-reducer';
import { environment } from '../../environments/environment';

const LOCALIZATIONS = ['us', 'fr', 'pt', 'it', 'de', 'es'];

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    userInfo: AppStore<AggregatedUserInfo>;
    currentStore: AppStore<Store>;

    appUrl = environment.APP_URL;

    localizations;

    constructor(protected _appStore: AppStore<AppState>,
                protected _storeService: StoreService,
                @Inject(LOCALE_ID) public localeId = environment.DEFAULT_LANGUAGE) {
        this.userInfo = this._appStore.select('userInfo');
        this.currentStore = this._appStore.select('currentStore');
        if (!LOCALIZATIONS.find(locale => locale === this.localeId)) {
            this.localeId = environment.DEFAULT_LANGUAGE;
        }
        this.localizations = LOCALIZATIONS.filter(locale => locale !== this.localeId);

    }

    chooseStore(store) {
        this.currentStore.dispatch({type: SET_STORE, store});
        this._storeService.getAllConfiguredChannels(store.id).subscribe(channels =>
            this._appStore.select('channels').dispatch({type: SET_CHANNELS, channels}));
    }
}
