import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SflAuthService } from 'sfl-shared/services';

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(protected router: Router, protected authService: SflAuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
