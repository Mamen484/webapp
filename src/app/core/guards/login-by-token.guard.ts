import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class LoginByTokenGuard implements CanActivate {

    constructor(protected localStorage: LocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
        }

        return true;
    }
}
