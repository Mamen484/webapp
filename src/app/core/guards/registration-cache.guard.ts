import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, flatMap, tap, map, count } from 'rxjs/operators';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';
import { SflWindowRefService } from 'sfl-shared';
import { environment } from '../../../environments/environment';
import { SflLocalStorageService } from 'sfl-shared';

@Injectable()
export class RegistrationCacheGuard implements CanActivate {

    protected token;

    constructor(
        protected shopifyService: ShopifyAuthentifyService,
        protected windowRef: SflWindowRefService,
        protected localStorage: SflLocalStorageService
        ) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getExistingStore(next.queryParams)
            .pipe(filter(store => store.storeId > 0))
            .pipe(flatMap(store => this.shopifyService.updateStore(store)))
            .pipe(map(() => {
                this.localStorage.removeItem('sf.registration');
                this.windowRef.nativeWindow.location.href = environment.APP_URL + '?token=' + this.token;
            }))
            .pipe(count())
            .pipe(map(number => !number));
    }

    protected getExistingStore(params) {
        let cache = this.getStoreFromCache();
        if (cache) {
            return of(JSON.parse(cache));
        }
        return this.shopifyService.getStoreData(params['shop'], params)
        // we need to save the store data in cache, because we cannot call shopifyService.getStoreData twice with the same code
            .pipe(tap(store => this.localStorage.setItem('sf.registration', JSON.stringify(store))))
            .pipe(tap(store => this.autoLoginUser(store)));
    }

    protected getStoreFromCache() {
        return this.localStorage.getItem('sf.registration');
    }

    protected autoLoginUser(store) {
        this.token = store.owner.token;
        this.localStorage.setItem('Authorization', `Bearer ${store.owner.token}`);
    }

}

