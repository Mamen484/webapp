import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store as AppStore } from 'sfl-shared/entities';
import { SflLocalStorageService } from 'sfl-shared/services';

@Injectable()
export class LegacyLinkService {

    currentStore: AppStore;

    constructor(protected appStore: Store<AppState>,
                protected localStorage: SflLocalStorageService) {
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    getLegacyLink(path, params = {}, addAuthorization = true) {
        let queryParams = new URLSearchParams();
        for (let param in params) {
            if (params.hasOwnProperty(param) && params[param]) {
                queryParams.set(param, params[param]);
            }
        }
        if (addAuthorization) {
            let auth = this.localStorage.getItem('Authorization');
            if (auth) {
                queryParams.set('token', auth.replace('Bearer ', ''));
            }
            if (!(<any>params).store && this.currentStore && this.currentStore.id) {
                queryParams.set('store', this.currentStore.id.toString());
            }
        }

        let paramsString = queryParams.toString();

        return paramsString
            ? environment.APP_URL + path + '?' + queryParams.toString()
            : environment.APP_URL + path;
    }

}
