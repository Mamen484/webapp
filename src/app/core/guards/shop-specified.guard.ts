import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SflWindowRefService } from 'sfl-shared/services';

@Injectable()
export class ShopSpecifiedGuard implements CanActivate {

    constructor(protected windowRef: SflWindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {
        if (!next.queryParams.shop) {
            this.windowRef.nativeWindow.location.href = environment.SHOPIFY_APP_URL;
            return false;
        }
        return true;
    }
}
