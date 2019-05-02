import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddStoreParamGuard implements CanActivateChild {

    constructor(protected router: Router,
                protected appStore: Store<AppState>) {

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UrlTree> | boolean {
        if (route.queryParamMap.has('store')) {
            return true;
        }
        return this.appStore.select('currentStore')
            .pipe(filter(store => Boolean(store)), take(1), map((store => {
                const queryParams = Object.assign({}, route.queryParams);
                queryParams.store = store.id.toString();
                return this.router.createUrlTree([state.url.split('?')[0]], {queryParams});
            })));
    }
}
