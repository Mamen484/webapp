import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { Location } from '@angular/common';

@Injectable()
export class LoginByTokenGuard implements CanActivate {

    constructor(protected localStorage: LocalStorageService, protected location: Location) {
    }

    canActivate(next: ActivatedRouteSnapshot): true {
        if (next.queryParamMap.has('token')) {
            this.localStorage.setItem('Authorization', 'Bearer ' + next.queryParams.token);
            // remove a token from an url to prevent unneeded sharing the token by coping an url from a browser address bar
            this.location.replaceState(this.location.path().replace(/token=[a-zA-Z0-9]*&?/, ''));
        }

        return true;
    }
}
