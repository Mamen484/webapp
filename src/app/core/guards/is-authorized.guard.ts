import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
    constructor(
        protected windowRef: WindowRefService,
        protected userService: UserService,
        protected localStorage: LocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // check Authorization in a storage
        let auth = this.localStorage.getItem('Authorization');
        if (!auth) {
            this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';
            return false;
        }
        return Observable.create(observer => {
            this.userService.fetchAggregatedInfo().subscribe(
                // activate if no errors
                () => {
                    observer.next(true);
                    observer.complete();
                },
                // do not activate and redirect to /login when an error
                () => {
                    observer.next(false);
                    observer.complete();
                    this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';

                }
            );
        });
    }
}
