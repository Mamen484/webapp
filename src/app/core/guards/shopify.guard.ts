import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';

@Injectable()
export class ShopifyGuard implements CanActivate {

    constructor(protected service: ShopifyAuthentifyService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        localStorage.removeItem('sf.path.initial');

        if (!next.queryParams['shop']) {
            window.location.href = environment.SHOPIFY_APP_URL;
        } else if (!next.queryParams['code']) {
            this.service.getAuthorizationUrl(next.queryParams['shop']).subscribe((url: string) => {
                debugger;
                window.location.href = url;
            });
        }
        return false;
    }
}
