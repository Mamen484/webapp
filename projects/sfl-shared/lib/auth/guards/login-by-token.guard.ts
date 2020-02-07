import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { SflLocalStorageService } from 'sfl-shared/services';

/**
 * Authenticate a user by adding a token param into a url.
 * Just add a guard to a base route of your app.
 *
 * @example
 *
 * https://app.shopping-feed.com/v3/en?token=put_your_token_here
 */

@Injectable({
    providedIn: 'root',
})
export class SflLoginByTokenGuard implements CanActivate {

    constructor(protected localStorage: SflLocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
        }

        return true;
    }
}
