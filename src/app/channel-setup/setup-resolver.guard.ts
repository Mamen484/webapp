import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { catchError, flatMap, map, take } from 'rxjs/operators';
import { Feed } from '../core/entities/feed';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

@Injectable({
    providedIn: 'root'
})
export class SetupResolverGuard implements Resolve<Observable<false | { channel: Channel, feed: Feed }>> {
    constructor(protected channelService: ChannelService,
                protected feedService: FeedService,
                protected router: Router,
                protected store: Store<AppState>) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.feedService.fetchFeed(route.params.feedId)
            .pipe(
                catchError(() => {
                    this.router.navigate(['feed-not-found']);
                    return throwError(null);
                }),
                flatMap(feed => this.store.select('currentStore').pipe(
                    take(1),
                    map(store => {
                        if (feed.catalogId !== store.id) {
                            this.router.navigate(['feed-not-found']);
                            return throwError(null);
                        }
                        return feed;
                    }))),
                flatMap((feed: Feed) => this.channelService.getChannel(feed.channelId)
                    .pipe(
                        catchError(error => {
                            this.router.navigate(['channel-not-found']);
                            return throwError(null);
                        }),
                        map((channel) => ({feed, channel})))
                ));
    }
}
