import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Feed } from '../entities/feed';
import { ChannelLinkPipe } from '../../shared/channel-link/channel-link.pipe';
import { FeedService } from './feed.service';
import { ChannelService } from './channel.service';
import { CategoryMapping } from '../../channel-setup/category-mapping';
import { SflLocaleIdService, SflWindowRefService } from 'sfl-shared/services';
import { Router } from '@angular/router';
import { Channel } from 'sfl-shared/entities';
import { LegacyLinkService } from './legacy-link.service';

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

    navigateToChannel(channel: Channel) {
        this.decideToSkipSetup(channel).subscribe(skipSetup => {
            if (skipSetup) {
                this.goToChannel(ChannelLinkPipe.getChannelLink(channel));
            } else {
                this.goToChannelSetup(channel.id);
            }
        });
    }

    protected decideToSkipSetup(channel) {
        return zip(
            this.getFeedCollection(channel),
            this.channelService.getChannelCategories(channel.id, {limit: '1'})
        ).pipe(
            map(([feed, categoriesPage]) => ([feed._embedded.feed[0], categoriesPage._embedded.category.length > 0])),
            flatMap(([feed, channelHasCategories]: [Feed, boolean]) =>
                channelHasCategories ? this.hasConfiguredCategories(feed.id) : of(true)
            ));
    }

    protected hasConfiguredCategories(feedId): Observable<boolean> {
        return this.feedService.fetchCategoryCollection(feedId, {mapping: CategoryMapping.Mapped})
            .pipe(map(response => Boolean(response._embedded.category.length)));
    }

    protected getFeedCollection(channel) {
        if (channel.installed) {
            return this.feedService.fetchFeedCollection(channel.id);
        }
        return this.feedService.create(channel.id)
            .pipe(flatMap(() => this.feedService.fetchFeedCollection(channel.id)))
    }

    protected goToChannel(channelLink) {
        this.windowRefService.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(channelLink);
    }

    protected goToChannelSetup(channelId) {
        this.router.navigate(['/channel-setup', channelId]);
    }
}
