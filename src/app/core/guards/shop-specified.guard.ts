import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class ShopSpecifiedGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {
        if (!next.queryParams.shop) {
            this.windowRef.nativeWindow.location.href = environment.SHOPIFY_APP_URL;
            return false;
        }
        return true;
    }
}
