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
        return this.service.auth().pipe(
            tap(response => {
                this.saveState(response.authorizeUrl);
                this.windowRef.nativeWindow.location.href = response.authorizeUrl;
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
