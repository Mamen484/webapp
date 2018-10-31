import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { SflLocalStorageService } from 'sfl-shared';

@Injectable()
export class LoginByTokenGuard implements CanActivate {

    constructor(protected localStorage: SflLocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
        }

        return true;
    }
}
