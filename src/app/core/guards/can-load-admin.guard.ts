import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { UserService } from '../services/user.service';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected router: Router,
                protected appStore: Store<AppState>,
                protected userService: UserService) {
    }

    canLoad(): Observable<boolean> {
        return this.appStore.select('userInfo')
            .take(1)
            .flatMap(info => info
                ? Observable.of(info)
                : this.userService.fetchAggregatedInfo().do(userInfo => this.appStore.dispatch({
                    type: INITIALIZE_USER_INFO,
                    userInfo
                }))
            )
            .map(userInfo => {
                if (!userInfo.isAdmin()) {
                    this.router.navigate(['/home']);
                    return false;
                }
                return true;
            });
    }
}
