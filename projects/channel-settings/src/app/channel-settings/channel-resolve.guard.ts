import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Channel } from 'sfl-shared/entities';
import { EMPTY, Observable } from 'rxjs';
import { ChannelService, SflUserService } from 'sfl-shared/services';
import { flatMap } from 'rxjs/operators';
import { get } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ChannelResolveGuard implements Resolve<Channel> {

    constructor(protected channelService: ChannelService, protected userService: SflUserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
        return this.userService.fetchAggregatedInfo().pipe(
            flatMap(userInfo => {
                const channelId = userInfo.isAdmin() && route.queryParamMap.get('channelId') || get(userInfo._embedded, 'channel[0].id');
                return channelId
                    ? this.channelService.fetchChannel(channelId)
                    : EMPTY;
            }));
    }
}
