import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SflAuthService, SflUserService } from 'sfl-shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

/**
 * This guard is used to detect if the user is logged in.
 * If NOT, then redirect to the login page.
 * If YES, then store the userInfo from /me response to the app store.
 * Used on the pages, where authentication is required.
 */

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
    constructor(protected router: Router,
                protected userService: SflUserService,
                protected appStore: Store<AppState>,
                protected authService: SflAuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        return new Observable(observer => {
            this.userService.fetchAggregatedInfo().subscribe(
                userInfo => {
                    if (userInfo.hasEnabledStore(next.queryParams.store) || userInfo.isAdmin()) {
                        observer.next(true);
                        observer.complete();
                    } else {
                        this.isNotAuthorized(observer)
                    }
                },
                // do not activate and redirect to /login when an error
                (error: HttpErrorResponse) => {
                    if (error.status >= 400 && error.status < 500) { // client error
                        this.isNotAuthorized(observer);
                    } else if (error.status >= 500) { // server error
                        this.router.navigate(['/critical-error'], {skipLocationChange: true});
                        observer.next(false);
                        observer.complete();
                    }

                }
            );
        });
    }

    protected isNotAuthorized(observer) {
        this.router.navigate(['/login']);
        this.authService.logout();
        observer.next(false);
        observer.complete();
    }
}
