import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Injectable()
export class CanLoadAdminGuard implements CanLoad {

    constructor(protected userService: UserService, protected router: Router) {
    }

    canLoad(): Observable<boolean> {
        return this.userService.fetchAggregatedInfo().map(userInfo => {

            let canLoad = Boolean(userInfo.roles.find(role => role === 'admin' || role === 'employee'));
            if (!canLoad) {
                this.router.navigate(['/statistics']);
            }
            return canLoad;
        });
    }
}
