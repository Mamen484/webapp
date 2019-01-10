import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from '../core/services/channel.service';

@Injectable({
    providedIn: 'root'
})
export class ResolveChannelGuard implements Resolve<Channel> {
    constructor(protected channelService: ChannelService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
        return this.channelService.getChannel(route.params.channelId);
    }
}
