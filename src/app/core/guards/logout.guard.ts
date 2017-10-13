import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected windowRef: WindowRefService, protected localStorage: LocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = environment.BASE_HREF + '/' + environment.LOCALE_ID + '/login';
        return false;
    }
}
