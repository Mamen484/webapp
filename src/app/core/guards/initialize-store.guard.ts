import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected appStore: Store<AppState>) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.appStore.select('userInfo').map(userInfo => {
            let store = userInfo.findEnabledStore(next.queryParams.store) || userInfo.findFrstEnabledStore();
            this.appStore.select('currentStore').dispatch({type: SET_STORE, store});

            return true;
        });
    }

}
