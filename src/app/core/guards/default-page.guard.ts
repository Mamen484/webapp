import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

@Injectable()
export class DefaultPageGuard implements CanActivate {

    constructor(protected appStore: Store<AppState>, protected router: Router) {
    }

    canActivate(): boolean {
       this.appStore.select('userInfo').take(1).subscribe((userInfo: AggregatedUserInfo) => {
            if (userInfo.roles.find(role => role === 'admin' || role === 'employee')) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/home']);
            }
        });
        return false;
    }
}
