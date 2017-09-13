import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class LoginByTokenGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.windowRef.nativeWindow.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
        }

        return true;
    }
}
