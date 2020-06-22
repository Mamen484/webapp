import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { count, filter, flatMap, map, tap } from 'rxjs/operators';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { SflAuthService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistrationCacheGuard implements CanActivate {

    constructor(
        protected shopifyService: ShopifyAuthentifyService,
        protected windowRef: SflWindowRefService,
        protected authService: SflAuthService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getExistingStore(next.queryParams)
            .pipe(filter(store => store.storeId > 0))
            .pipe(flatMap(store => this.shopifyService.updateStore(store)))
            .pipe(map(() => {
                this.windowRef.nativeWindow.location.href = environment.APP_URL;
            }))
            .pipe(count())
            .pipe(map(number => !number));
    }

    protected getExistingStore(params) {
        return this.shopifyService.getStoreData(params['shop'], params)
            .pipe(tap(store => this.autoLoginUser(store)));
    }

    protected autoLoginUser(store) {
        if (!store.owner.token) {
            return;
        }
        this.authService.loginByToken(store.owner.token);
    }

}

