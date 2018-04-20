import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { StoreService } from '../services/store.service';
import { Permission } from '../entities/permission';
import { Store } from '../entities/store';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.appStore.select('userInfo').filter(userInfo => Boolean(userInfo)).take(1).flatMap(userInfo => {
            if (userInfo.isAdmin() && next.queryParams.store) {
                return this.storeService.getStore(next.queryParams.store).map((store: Store) => {
                    store.permission = Permission.createForAdmin();
                    this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
                    return true;
                }).catch(error => {
                    this.router.navigate(['/store-not-found'], {skipLocationChange: true});
                    return Observable.of(false);
                });
            }
            let enabledStore = userInfo.findEnabledStore(next.queryParams.store) || userInfo.findFirstEnabledStore();
            this.appStore.select('currentStore').dispatch({type: SET_STORE, store: enabledStore});

            return Observable.of(true);
        });
    }

}
