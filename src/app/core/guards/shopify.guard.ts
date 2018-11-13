import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';
import { SflLocalStorageService } from 'sfl-shared/services';
import { SflWindowRefService } from 'sfl-shared/services';

@Injectable()
export class ShopifyGuard implements CanActivate {

    constructor(protected service: ShopifyAuthentifyService,
                protected localStorage: SflLocalStorageService,
                protected windowRef: SflWindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {

        this.localStorage.removeItem('sf.registration');

        if (!next.queryParams['shop']) {
            this.windowRef.nativeWindow.location.href = environment.SHOPIFY_APP_URL;
        } else if (!next.queryParams['code']) {
            this.service.getAuthorizationUrl(next.queryParams['shop']).subscribe((url: string) => {
                this.windowRef.nativeWindow.location.href = url;
            });
        }
        return false;
    }
}
