import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { SflUserService } from 'sfl-shared/services';

@Injectable()
export class AggregatedUserInfoResolveGuard implements Resolve<Observable<AggregatedUserInfo>> {

    constructor(protected userService: SflUserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AggregatedUserInfo> {
        return this.userService.fetchAggregatedInfo();
    }
}
