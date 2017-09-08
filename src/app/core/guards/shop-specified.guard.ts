import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';

// TODO: check if we need to update the store when the shop is not specified, see create-password ngOnInit.

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
