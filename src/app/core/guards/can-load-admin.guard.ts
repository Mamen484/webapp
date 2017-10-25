import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { UserService } from '../services/user.service';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected router: Router,
                protected appStore: Store<AppState>,
                protected userService: UserService) {
    }

    canLoad(): Observable<boolean> {
        return this.appStore.select('userInfo')
            .flatMap(userInfo => userInfo ? Observable.of(userInfo) : this.userService.fetchAggregatedInfo())
            .take(1)
            .map(userInfo => {
                if (!userInfo.isAdmin()) {
                    this.router.navigate(['/home']);
                    return false;
                }
                return true;
            });
    }
}
