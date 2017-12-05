import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';

/**
 * This guard is used to detect if the user is logged in.
 * If NOT, then redirect to the login page.
 * If YES, then store the userInfo from /me response to the app store.
 * Used on the pages, where authentication is required.
 */

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
    constructor(protected router: Router,
                protected userService: UserService,
                protected localStorage: LocalStorageService,
                protected appStore: Store<AppState>,
                protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // check Authorization in a storage
        let auth = this.localStorage.getItem('Authorization');
        if (!auth) {
            this.router.navigate(['/login']);
            return false;
        }
        return Observable.create(observer => {
            this.appStore.select('userInfo').take(1)
                .flatMap(userInfo => userInfo ? Observable.of(userInfo) : this.userService.fetchAggregatedInfo())
                .subscribe(
                userInfo => {
                    if (userInfo.hasEnabledStore(next.queryParams.store) || userInfo.isAdmin()) {
                        this.appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
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
        this.localStorage.removeItem('Authorization');
        observer.next(false);
        observer.complete();
    }
}
