import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store } from '@ngrx/store';
import { Store as ApiStore } from '../entities/store';
import { AppState } from '../entities/app-state';
import { StoreService } from '../services/store.service';
import { Permission } from '../entities/permission';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected userService: UserService,
                protected appStore: Store<AppState>,
                protected storeService: StoreService,
                protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.userService.fetchAggregatedInfo().flatMap(userInfo => {
            if (userInfo.isAdmin() && next.queryParams.store) {
                return this.storeService.getStore(next.queryParams.store).map((store: ApiStore) => {
                    store.permission = Permission.createForAdmin();
                    this.appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
                    this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
                    return true;
                }).catch(error => {
                    return Observable.of(false);
                });
            }
            let enabledStore = userInfo.findEnabledStore(next.queryParams.store) || userInfo.findFirstEnabledStore();
            this.appStore.select('userInfo').dispatch({type: INITIALIZE_USER_INFO, userInfo});
            this.appStore.select('currentStore').dispatch({type: SET_STORE, store: enabledStore});

            return Observable.of(true);
        });
    }
}
