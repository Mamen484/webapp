import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store as AppStore } from 'sfl-shared/entities';
import { SflAuthService, SflLegacyLinkService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LegacyLinkService extends SflLegacyLinkService {

    currentStore: AppStore;

    constructor(protected appStore: Store<AppState>,
                protected authService: SflAuthService) {
        super(authService, environment.APP_URL);
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
    }

    getLegacyLink(path, params: any = {}, addAuthorization = true) {
        if (addAuthorization && !params.store && this.currentStore && this.currentStore.id) {
            params.store = this.currentStore.id.toString();
        }
        return super.getLegacyLink(path, params, addAuthorization);
    }

}
