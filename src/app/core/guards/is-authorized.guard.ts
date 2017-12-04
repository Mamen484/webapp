import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { StoreStatus } from '../entities/store-status.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * This guard is used to detect if the user is logged in. If NOT, then redirect to the login page.
 * Used on the pages, where authentication is required.
 */

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
    constructor(protected windowRef: WindowRefService,
                protected userService: UserService,
                protected localStorage: LocalStorageService,
                protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // check Authorization in a storage
        let auth = this.localStorage.getItem('Authorization');
        if (!auth) {
            this.redirectToLogin();
            return false;
        }
        return Observable.create(observer => {
            this.userService.fetchAggregatedInfo().subscribe(
                userInfo => {

                    // activate if no errors and the user has at least 1 enabled store
                    if (this.hasEnabledStore(userInfo._embedded.store, next.queryParams.store)) {
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

    protected redirectToLogin() {
        this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';
    }

    protected hasEnabledStore(store, storeQueryParam) {
        if (storeQueryParam) {
            return store.find(s => s.status !== StoreStatus.deleted && s.name === storeQueryParam);
        }
        return store.find(s => s.status !== StoreStatus.deleted);
    }

    protected isNotAuthorized(observer) {
        this.redirectToLogin();
        this.localStorage.removeItem('Authorization');
        observer.next(false);
        observer.complete();
    }
}
