import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { toPairs } from 'lodash';
import { Helpers } from '../entities/helpers';

@Injectable()
export class RegistrationCacheGuard implements CanActivate {

    protected token;

    constructor(protected shopifyService: ShopifyAuthentifyService, protected windowRef: WindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getExistingStore(next.queryParams)
            .filter(store => store.storeId > 0)
            .flatMap(store => this.shopifyService.updateStore(store))
            .map(() => {
                this.windowRef.nativeWindow.localStorage.removeItem('sf.registration');
                this.windowRef.nativeWindow.location.href = environment.APP_URL + '?' + this.token;
            })
            .count()
            .map(count => !count);
    }

    protected getExistingStore(params) {
        let cache = this.getStoreFromCache();
        if (cache) {
            return Observable.of(JSON.parse(cache));
        }
        return this.shopifyService.getStoreData(params['shop'], params)
        // we need to save the store data in cache, because we cannot call shopifyService.getStoreData twice with the same code
            .do(store => this.windowRef.nativeWindow.localStorage.setItem('sf.registration', JSON.stringify(store)))
            .do(store => this.autoLoginUser(store));
    }

    protected getStoreFromCache() {
        return this.windowRef.nativeWindow.localStorage.getItem('sf.registration');
    }

    protected autoLoginUser(store) {
        this.token = store.owner.token;
        this.windowRef.nativeWindow.localStorage.setItem('Authorization', `Bearer ${store.owner.token}`);
    }

}

