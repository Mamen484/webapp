import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store as AppStore } from '../entities/store';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class LegacyLinkService {

    currentStore: AppStore;

    constructor(protected appStore: Store<AppState>,
                protected localStorage: LocalStorageService) {
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    getLegacyLink(path, params = {}) {
        let queryParams = new URLSearchParams();
        for (let param in params) {
            if (params.hasOwnProperty(param) && params[param]) {
                queryParams.set(param, params[param]);
            }
        }
        let auth = this.localStorage.getItem('Authorization');
        if (auth) {
            queryParams.set('token', auth.replace('Bearer ', ''));
        }
        if (this.currentStore && this.currentStore.name) {
            queryParams.set('store', this.currentStore.name);
        }
        return environment.APP_URL + path + '?' + queryParams.toString();
    }

}
