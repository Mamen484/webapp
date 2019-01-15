import { Component, Input, OnInit } from '@angular/core';
import { StoreChannel } from 'sfl-shared/entities';
import { FeedService } from '../../../core/services/feed.service';
import { Router } from '@angular/router';
import { CategoryMapping } from '../../../channel-setup/category-mapping';
import { LegacyLinkService } from '../../../core/services/legacy-link.service';
import { SflWindowRefService } from 'sfl-shared/services';
import { ChannelLinkPipe } from '../../../shared/channel-link/channel-link.pipe';
import { flatMap, map } from 'rxjs/operators';
import { Observable, of, zip } from 'rxjs';
import { ChannelService } from '../../../core/services/channel.service';
import { Feed } from '../../../core/entities/feed';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss'],
})
export class ConfiguredChannelComponent implements OnInit {

    @Input() channel: StoreChannel;
    @Input() hasStatisticsPermission = false;

    revenueStatisticsAvailable = false;

    channelsOnline: number;

    constructor(protected feedService: FeedService,
                protected channelService: ChannelService,
                protected router: Router,
                protected legacyLinkService: LegacyLinkService,
                protected windowRefService: SflWindowRefService) {
    }

    ngOnInit() {
        this.initializeOnline();
        this.revenueStatisticsAvailable = this.statisticsExistsFor('revenue');
    }

    goToChannelLink() {
        zip(
            this.feedService.fetchFeedCollection(this.channel._embedded.channel.id),
            this.channelService.getChannelCategories(this.channel._embedded.channel.id, {limit: '1'})
        ).pipe(
            map(([feed, channel]) => ([feed._embedded.feed[0], channel._embedded.category.length > 0])),
            flatMap(([feed, channelHasCategories]: [Feed, boolean]) =>
                channelHasCategories ? this.hasConfiguredCategories(feed.id) : of(true)
            ))
            .subscribe(skipSetup => {
                if (skipSetup) {
                    this.goToChannel(ChannelLinkPipe.getChannelLink(this.channel._embedded.channel));
                } else {
                    this.goToChannelSetup();
                }
            });

    }

    protected hasConfiguredCategories(feedId): Observable<boolean> {
        return this.feedService.fetchCategoryCollection(feedId, {mapping: CategoryMapping.Mapped})
            .pipe(map(response => Boolean(response._embedded.category.length)));
    }

    protected goToChannel(channelLink) {
        this.windowRefService.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(channelLink);
    }

    protected goToChannelSetup() {
        this.router.navigate(['/channel-setup', this.channel._embedded.channel.id]);
    }

    protected initializeOnline() {
        if (!this.statisticsExistsFor('exported')
            || !this.statisticsExistsFor('selected')
            || this.channel.statistics.selected === 0) {
            return;
        }

        this.channelsOnline = Math.round(
            Number(this.channel.statistics.exported)
            / Number(this.channel.statistics.selected)
            * 100);

        if (this.channelsOnline > 100) {
            this.channelsOnline = 100;
        }
    }

    protected statisticsExistsFor(property) {
        return Boolean(this.channel.statistics) && typeof this.channel.statistics[property] === 'number';
    }
}
