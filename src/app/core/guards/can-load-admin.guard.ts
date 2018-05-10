import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, flatMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { UserService } from '../services/user.service';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected router: Router,
                protected appStore: Store<AppState>,
                protected userService: UserService) {
    }

    canLoad(): Observable<boolean> {

        return Observable.create(observer => {
            this.appStore.select('userInfo')
                .pipe(take(1))
                .pipe(flatMap(info => info
                    ? of(info)
                    : this.userService.fetchAggregatedInfo().pipe(tap(userInfo => this.appStore.dispatch({
                        type: INITIALIZE_USER_INFO,
                        userInfo
                    })))))
                .subscribe(userInfo => {
                        if (!userInfo.isAdmin()) {
                            this.router.navigate(['/home']);
                            observer.next(false);
                        } else {
                            observer.next(true);
                        }
                        observer.complete();
                    },
                    (error: HttpErrorResponse) => {
                        if (error.status >= 400 && error.status < 500) { // client error
                            this.router.navigate(['/login']);
                        } else if (error.status >= 500) { // server error

                            this.router.navigate(['/critical-error'], {skipLocationChange: true});
                        }
                        observer.next(false);
                        observer.complete();

                    });
        });
    }
}
