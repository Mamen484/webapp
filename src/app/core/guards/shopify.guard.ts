import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';
import { LocalStorageService } from '../services/local-storage.service';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class ShopifyGuard implements CanActivate {

    constructor(protected service: ShopifyAuthentifyService,
                protected localStorage: LocalStorageService,
                protected windowRef: WindowRefService) {
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
