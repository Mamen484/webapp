import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected userService: UserService, protected appStore: Store<AppState>) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.userService.fetchAggregatedInfo().map(userInfo => {
            let store;
            if (next.queryParams.store) {
                store = userInfo._embedded.store.find(s => s.name === next.queryParams.store || String(s.id) === next.queryParams.store);
            }
            if (!store) {
                store = userInfo._embedded.store[0];
            }
            this.appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
            this.appStore.select('currentStore').dispatch({type: SET_STORE, store});

            return true;
        });
    }
}
