import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class DefaultPageGuard implements CanActivate {

    constructor(protected appStore: Store<AppState>, protected router: Router) {
    }


    canActivate(route: ActivatedRouteSnapshot): boolean {
        this.appStore.select('userInfo').pipe(take(1)).subscribe((userInfo: AggregatedUserInfo) => {
            if (!route.queryParams.store && userInfo.roles.find(role => role === 'admin' || role === 'employee')) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/home'], {queryParams: {store: route.queryParams.store}});
            }
        });
        return false;
    }
}
