import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { map } from 'rxjs/operators';
import { Feed } from '../core/entities/feed';

@Injectable({
    providedIn: 'root'
})
export class SetupResolverGuard implements Resolve<Observable<{channel: Channel, feed: Feed}>> {
    constructor(protected channelService: ChannelService, protected feedService: FeedService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return zip(
            this.channelService.getChannel(route.params.channelId),
            this.feedService.fetchFeedCollection(route.params.channelId),
        ).pipe(map(([channel, feed]) => ({channel, feed: feed._embedded.feed[0]})));
    }
}
