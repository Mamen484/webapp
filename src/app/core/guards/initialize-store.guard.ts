import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { SET_STORE } from '../reducers/current-store-reducer';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { StoreService } from '../services/store.service';
import { Permission, Store } from 'sfl-shared/src/lib/core/entities';
import { SflUserService } from 'sfl-shared';

@Injectable()
export class InitializeStoreGuard implements CanActivate {

    constructor(protected appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected router: Router,
                protected userService: SflUserService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        return this.userService.fetchAggregatedInfo().pipe(flatMap(userInfo => {
                if (userInfo.isAdmin() && next.queryParams.store) {
                    return this.storeService.getStore(next.queryParams.store).pipe(map((store: Store) => {
                        store.permission = Permission.createForAdmin();
                        this.appStore.dispatch({type: SET_STORE, store});
                        return true;
                    })).pipe(catchError(error => {
                        this.router.navigate(['/store-not-found'], {skipLocationChange: true});
                        return of(false);
                    }));
                }
                let enabledStore = userInfo.findEnabledStore(next.queryParams.store) || userInfo.findFirstEnabledStore();
                this.appStore.dispatch({type: SET_STORE, store: enabledStore});

                return of(true);
            }
        ));
    }

}
