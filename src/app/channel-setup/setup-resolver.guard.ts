import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from '../core/services/channel.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class SetupResolverGuard implements Resolve<Observable<{ channel: Channel }>> {
    constructor(protected channelService: ChannelService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.channelService.getChannel(route.params.channelId)
            .pipe(map((channel) => ({channel})));
    }
}
