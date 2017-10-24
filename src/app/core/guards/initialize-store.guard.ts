import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { StoreService } from '../services/store.service';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected appStore: Store<AppState>, protected storeService: StoreService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.appStore.select('userInfo').filter(userInfo => Boolean(userInfo)).take(1).flatMap(userInfo => {
            if (userInfo.isAdmin() && next.queryParams.store) {
                return this.storeService.getStore(next.queryParams.store).map(store => {
                    this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
                    return true;
                });
            }
            let store = userInfo.findEnabledStore(next.queryParams.store) || userInfo.findFirstEnabledStore();
            this.appStore.select('currentStore').dispatch({type: SET_STORE, store});

            return Observable.of(true);
        });
    }

}
