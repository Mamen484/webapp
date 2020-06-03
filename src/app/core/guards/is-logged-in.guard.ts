import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SflAuthService, SflLocalStorageService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { LegacyLinkService } from '../services/legacy-link.service';

/**
 * This guard is used to detect if the user logged in and if so to redirect to the homepage. For use on the login page.
 */

@Injectable()
export class IsLoggedInGuard implements CanActivate {

    constructor(protected windowRef: SflWindowRefService,
                protected userService: SflUserService,
                protected legacyLinkService: LegacyLinkService,
                protected authService: SflAuthService) {

    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        if (this.authService.isLoggedIn()) {
            return new Observable(observer => {
                this.userService.fetchAggregatedInfo().subscribe(
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
