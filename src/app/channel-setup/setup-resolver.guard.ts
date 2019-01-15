import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Feed } from '../core/entities/feed';

@Injectable({
    providedIn: 'root'
})
export class SetupResolverGuard implements Resolve<Observable<false | { channel: Channel, feed: Feed }>> {
    constructor(protected channelService: ChannelService,
                protected feedService: FeedService,
                protected router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return zip(
            this.channelService.getChannel(route.params.channelId).pipe(catchError(error => of(null))),
            this.feedService.fetchFeedCollection(route.params.channelId),
        ).pipe(
            map(([channel, feed]) => {
                if (!channel) {
                    this.router.navigate(['channel-not-found']);
                    return false;
                }
                if (!feed._embedded.feed.length) {
                    this.router.navigate(['feed-not-found']);
                    return false;
                }
                return ({channel, feed: feed._embedded.feed[0]});
            }),
        );
    }
}
