import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SquarespaceService } from './squarespace.service';
import { map, tap } from 'rxjs/operators';
import { SflLocalStorageService, SflWindowRefService } from 'sfl-shared/services';
import { LocalStorageKey } from '../core/entities/local-storage-key.enum';

@Injectable({
    providedIn: 'root'
})
export class AuthentifyGuard implements CanActivate {

    constructor(protected service: SquarespaceService,
                protected localStorage: SflLocalStorageService,
                protected windowRef: SflWindowRefService) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const websiteId = route.queryParamMap.get('website_id');
        if (!websiteId) {
            return of(false);
        }

        return this.service.auth(websiteId).pipe(
            tap(response => {
                this.saveState(response.authorizeUrl);
                this.windowRef.nativeWindow.href = response.authorizeUrl;
            }),
            map(() => false),
        );
    }

    protected saveState(authorizeUrl) {
        const url = new URL(authorizeUrl);
        const state = url.searchParams.get('state');
        this.localStorage.setItem(LocalStorageKey.squarespaceState, state);
    }
}
