import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Location } from '@angular/common';

const TOKEN_IN_URL = /token=[a-zA-Z0-9]*&?/;

@Injectable()
export class LoginByTokenGuard implements CanActivate {

    constructor(protected localStorage: LocalStorageService, protected location: Location) {
    }

    canActivate(next: ActivatedRouteSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
            this.location.replaceState(this.location.path().replace(TOKEN_IN_URL, ''));
        }

        return true;
    }
}
