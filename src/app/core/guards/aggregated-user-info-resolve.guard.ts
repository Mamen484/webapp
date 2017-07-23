import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { UserService } from '../services/user.service';

@Injectable()
export class AggregatedUserInfoResolveGuard implements Resolve<Observable<AggregatedUserInfo>> {

    constructor(protected _userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AggregatedUserInfo> {
        return this._userService.fetchAggregatedInfo();
    }
}
