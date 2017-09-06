import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CreateStoreModel } from '../entities/create-store-model';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { toPairs } from 'lodash';
import { Helpers } from '../entities/helpers';

@Injectable()
export class RegistrationCacheGuard implements CanActivate {

    constructor(protected shopifyService: ShopifyAuthentifyService, protected windowRef: WindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        let cache = this.windowRef.nativeWindow.localStorage.getItem('sf.path.initial');
        if (cache) {
            let store = JSON.parse(cache) as CreateStoreModel;
            if (store.storeId > 0) {
                return this.shopifyService.updateStore(store).map(() => {
                    let url = environment.APP_URL + '?' + Helpers.createQueryString(next.queryParams);
                    this.windowRef.nativeWindow.localStorage.removeItem('sf.path.initial');
                    this.windowRef.nativeWindow.location.href = url;
                    return false;
                });
            }
        }

        return Observable.of(true);
    }
}

