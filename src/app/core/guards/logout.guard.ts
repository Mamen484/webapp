import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected localStorage: LocalStorageService, protected router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        this.localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
        return false;
    }
}
