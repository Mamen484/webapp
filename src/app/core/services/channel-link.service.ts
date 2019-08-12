import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { ChannelLinkPipe } from '../../shared/channel-link/channel-link.pipe';
import { FeedService } from './feed.service';
import { ChannelService } from './channel.service';
import { CategoryState } from '../../channel-setup/category-state';
import { SflLocaleIdService, SflWindowRefService } from 'sfl-shared/services';
import { Router } from '@angular/router';
import { StoreChannel } from 'sfl-shared/entities';
import { LegacyLinkService } from './legacy-link.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChannelLinkService {

    constructor(protected feedService: FeedService,
                protected channelService: ChannelService,
                protected windowRefService: SflWindowRefService,
                protected legacyLinkService: LegacyLinkService,
                protected router: Router,
                protected localeIdService: SflLocaleIdService) {
    }

    navigateToChannel(channel: StoreChannel) {
        this.decideToSkipSetup(channel).subscribe(({skipSetup, feedId}) => {
            if (skipSetup) {
                this.goToChannel(ChannelLinkPipe.getChannelLink(channel._embedded.channel));
            } else {
                this.goToFeedSetup(feedId);
            }
        });
    }

    getChannelLink(channel: StoreChannel) {
        return this.decideToSkipSetup(channel).pipe(map(({skipSetup, feedId}) => {
            return skipSetup
                ? ChannelLinkPipe.getChannelLink(channel._embedded.channel)
                : `${this.getWebappLink()}/feed/${feedId}/setup`;
        }));
    }

    protected decideToSkipSetup(channel: StoreChannel): Observable<{ skipSetup: boolean, feedId?: number }> {
        return this.channelService.getChannelCategories(channel._embedded.channel.id, {limit: '1'}).pipe(
            flatMap(categoriesPage => {
                if (categoriesPage._embedded.category.length > 0) {
                    return channel.installed ? this.getFeed(channel._embedded.channel.id).pipe(
                        flatMap(feed => this.hasConfiguredCategories(feed.id).pipe(
                            map(skipSetup => ({skipSetup, feedId: feed.id}))
                        )))
                        : this.createFeed(channel._embedded.channel.id).pipe(
                            map(feed => ({skipSetup: false, feedId: feed.id})),
                        )
                }
                return of({skipSetup: true});
            }));
    }

    protected hasConfiguredCategories(feedId): Observable<boolean> {
        return this.feedService.fetchCategoryCollection(feedId, {state: CategoryState.Configured})
            .pipe(map(response => Boolean(response._embedded.category.length)));
    }


    protected getFeed(channelId) {
        return this.feedService.fetchFeedCollection(channelId).pipe(
            map(feedCollection => feedCollection._embedded.feed[0])
        );
    }

    protected createFeed(channelId) {
        return this.feedService.create(channelId);
    }

    protected getWebappLink() {
        return `${environment.APP_URL}/${environment.BASE_HREF}/${this.localeIdService.localeId}`;
    }

    protected goToChannel(channelLink) {
        this.windowRefService.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(channelLink);
    }

    protected goToFeedSetup(feedId) {
        this.router.navigate(['/feed', feedId, 'setup']);
    }
}
