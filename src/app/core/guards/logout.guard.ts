import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (next.queryParamMap.has('logout')) {
            this.windowRef.nativeWindow.localStorage.removeItem('Authorization');
            this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';
            return false;
        }
        return true;
    }
}
