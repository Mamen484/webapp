import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Channel } from 'sfl-shared/entities';
import { Observable } from 'rxjs';
import { ChannelService, SflUserService } from 'sfl-shared/services';

@Injectable({
    providedIn: 'root'
})
export class ChannelResolveGuard implements Resolve<Channel> {

    constructor(protected channelService: ChannelService, protected userService: SflUserService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
        let channelId = route.queryParamMap.get('channelId');
        if (channelId) {
            return this.channelService.fetchChannel(channelId);
        }
    }
}
