import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { SflWindowRefService } from 'sfl-shared/services';

@Injectable({
    providedIn: 'root'
})
export class ShopifyGuard implements CanActivate {

    constructor(protected service: ShopifyAuthentifyService,
                protected windowRef: SflWindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {

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
