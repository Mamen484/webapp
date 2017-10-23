import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';

/**
 * This guard is used to detect if the user is logged in. If NOT, then redirect to the login page.
 * Used on the pages, where authentication is required.
 */

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
    constructor(
        protected windowRef: WindowRefService,
        protected userService: UserService,
        protected localStorage: LocalStorageService,
        protected appStore: Store<AppState>) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // check Authorization in a storage
        let auth = this.localStorage.getItem('Authorization');
        if (!auth) {
            this.redirectToLogin();
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
                () => this.isNotAuthorized(observer)
            );
        });
    }

    protected redirectToLogin() {
        this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';
    }


    protected isNotAuthorized(observer) {
        this.redirectToLogin();
        this.localStorage.removeItem('Authorization');
        observer.next(false);
        observer.complete();
    }
}
