import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from './services/window-ref.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService){}
    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (next.queryParamMap.has('logout')) {
            this.windowRef.nativeWindow.localStorage.removeItem('Authorization');
            this.windowRef.nativeWindow.location.href = environment.APP_URL + '/login';
            return false;
        }
        return true;
    }
}
