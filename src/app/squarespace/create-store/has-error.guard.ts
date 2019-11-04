import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';
import { SflLocalStorageService } from 'sfl-shared/services';

@Injectable({
    providedIn: 'root'
})
export class HasErrorGuard implements CanActivate {

    constructor(protected router: Router,
                protected localStorage: SflLocalStorageService) {
    }

    canActivate(next: ActivatedRouteSnapshot): boolean {
        const savedState = this.localStorage.getItem(LocalStorageKey.squarespaceState);
        const hasError = !savedState
            || next.queryParamMap.has('error')
            || savedState !== next.queryParamMap.get('state');
        if (hasError) {
            this.router.navigate(['squarespace', 'error']);
        }
        return !hasError;
    }

}
