import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SflLocalStorageService } from 'sfl-shared';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected localStorage: SflLocalStorageService, protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        this.localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
        return false;
    }
}
