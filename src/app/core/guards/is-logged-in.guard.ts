import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { UserService } from '../services/user.service';
import { LegacyLinkService } from '../services/legacy-link.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

/**
 * This guard is used to detect if the user logged in and if so to redirect to the homepage. For use on the login page.
 */

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService,
                protected userService: UserService,
                protected legacyLinkService: LegacyLinkService,
                protected localStorage: LocalStorageService,
                protected appStore: Store<AppState>) {

    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {

        let auth = this.localStorage.getItem('Authorization');
        if (auth) {
            return Observable.create(observer => {
                this.appStore.select('userInfo')
                    .flatMap(userInfo => userInfo ? Observable.of(userInfo) : this.userService.fetchAggregatedInfo())
                    .subscribe(
                    // token is valid, redirect to the homepage
                    () => {
                        this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink('/');
                        observer.next(false);
                        observer.complete();
                    },
                    // token is invalid, proceed to login
                    () => {
                        observer.next(true);
                        observer.complete();
                    }
                );
            });
        }
        return true;

    }
}
