import { Component, Inject, LOCALE_ID } from '@angular/core';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '../entities/store';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_STORE } from '../reducers/current-store';
import { StoreService } from '../services/store.service';
import { SET_CHANNELS } from '../reducers/channels-reducer';
import { environment } from '../../../environments/environment';

const LOCALIZATIONS = ['us', 'fr', 'pt', 'it', 'de', 'es'];
const DEFAULT_LANGUAGE = 'fr';

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
                @Inject(LOCALE_ID) public localeId = DEFAULT_LANGUAGE) {
        this.userInfo = this._appStore.select('userInfo');
        this.currentStore = this._appStore.select('currentStore');
        if (!LOCALIZATIONS.find(locale => locale === this.localeId)) {
            this.localeId = DEFAULT_LANGUAGE;
        }
        this.localizations = LOCALIZATIONS.filter(locale => locale !== this.localeId);

    }

    chooseStore(store) {
        this.currentStore.dispatch({type: SET_STORE, store});
        this._storeService.getAllConfiguredChannels(store.id).subscribe(channels =>
            this._appStore.select('channels').dispatch({type: SET_CHANNELS, channels}));
    }
}
