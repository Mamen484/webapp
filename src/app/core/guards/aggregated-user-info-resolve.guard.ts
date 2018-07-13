import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class AggregatedUserInfoResolveGuard implements Resolve<Observable<AggregatedUserInfo>> {

    constructor(protected appStore: Store<AppState>) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AggregatedUserInfo> {
        return this.appStore.select('userInfo').pipe(take(1));
    }
}
