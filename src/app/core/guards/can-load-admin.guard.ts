import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SflUserService } from 'sfl-shared';
import { SflWindowRefService } from 'sfl-shared';
import { environment } from '../../../environments/environment';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected router: Router,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected windowRefService: SflWindowRefService) {
    }

    canLoad(): Observable<boolean> {

        this.windowRefService.nativeWindow.location.href = environment.APP_URL + '/admin';
        return of(false);

        // return Observable.create(observer => {
        //     this.appStore.select('userInfo')
        //         .pipe(take(1))
        //         .pipe(flatMap(info => info
        //             ? of(info)
        //             : this.userService.fetchAggregatedInfo().pipe(tap(userInfo => this.appStore.dispatch({
        //                 type: INITIALIZE_USER_INFO,
        //                 userInfo
        //             })))))
        //         .subscribe(userInfo => {
        //                 if (!userInfo.isAdmin()) {
        //                     this.router.navigate(['/home']);
        //                     observer.next(false);
        //                 } else {
        //                     observer.next(true);
        //                 }
        //                 observer.complete();
        //             },
        //             (error: HttpErrorResponse) => {
        //                 if (error.status >= 400 && error.status < 500) { // client error
        //                     this.router.navigate(['/login']);
        //                 } else if (error.status >= 500) { // server error
        //
        //                     this.router.navigate(['/critical-error'], {skipLocationChange: true});
        //                 }
        //                 observer.next(false);
        //                 observer.complete();
        //
        //             });
        // });
    }
}
