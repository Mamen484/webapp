import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { UserService } from '../services/user.service';
import { LegacyLinkService } from '../services/legacy-link.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService,
                protected userService: UserService,
                protected legacyLinkService: LegacyLinkService,
                protected localStorage: LocalStorageService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        let auth = this.localStorage.getItem('Authorization');
        if (auth) {
            return Observable.create(observer => {
                this.userService.fetchAggregatedInfo().subscribe(
                    // token is valid, redirect to the homepage
                    () => {
                        observer.next(false);
                        observer.complete();
                        this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink('/');
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
