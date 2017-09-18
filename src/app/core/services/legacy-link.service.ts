import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store as AppStore } from '../entities/store';

@Injectable()
export class LegacyLinkService {

    currentStore: AppStore;

    constructor(protected windowRef: WindowRefService, protected appStore: Store<AppState>) {
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    getLegacyLink(path, params = {}) {
        let queryParams = new URLSearchParams();
        for (let param in params) {
            if (params.hasOwnProperty(param) && params[param]) {
                queryParams.set(param, params[param]);
            }
        }
        let auth = this.windowRef.nativeWindow.localStorage.getItem('Authorization');
        if (auth) {
            queryParams.set('token', auth.replace('Bearer ', ''));
        }
        if (this.currentStore && this.currentStore.name) {
            queryParams.set('store', this.currentStore.name);
        }
        return environment.APP_URL + path + '?' + queryParams.toString();
    }

}
