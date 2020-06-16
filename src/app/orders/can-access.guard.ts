import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        // access to the orders is forbidden when a user has no 'marketplaces' permission
        return this.store.select('currentStore').pipe(
            map(store => {
                const hasAccess = Boolean(store.permission.marketplaces);
                if (!hasAccess) {
                    this.router.navigate(['/no-access']);
                }
                return hasAccess;
            }));
    }
}
