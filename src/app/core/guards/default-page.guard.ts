import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';

@Injectable()
export class DefaultPageGuard implements CanActivate {

    constructor(protected userService: UserService, protected router: Router) {
    }

    canActivate(): boolean {
        this.userService.fetchAggregatedInfo().subscribe((userInfo: AggregatedUserInfo) => {
            if (userInfo.roles.find(role => role === 'admin' || role === 'employee')) {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/statistics']);
            }
        });
        return false;
    }
}
