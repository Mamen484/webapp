import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SflAuthService, SflUserService } from 'sfl-shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

/**
 * This guard is used to detect if the user is logged in.
 * If NOT, then redirect to the login page.
 * If YES, then store the userInfo from /me response to the app store.
 * Used on the pages, where authentication is required.
 */

@Injectable({
    providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {
    constructor(protected router: Router,
                protected userService: SflUserService,
                protected authService: SflAuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // check Authorization in a storage
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }

        return this.userService.fetchAggregatedInfo().pipe(
            map(userInfo => {
                return true;
            }),
            catchError(// do not activate and redirect to /login when an error
                (error: HttpErrorResponse) => {
                    if (error.status >= 400 && error.status < 500) { // client error
                        this.isNotAuthorized();
                    } else if (error.status >= 500) { // server error
                        this.router.navigate(['/critical-error'], {skipLocationChange: true});
                    }
                    return of(false);
                }))

    }

    protected isNotAuthorized() {
        this.router.navigate(['/login']);
        this.authService.logout();
    }
}
