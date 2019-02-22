import { TestBed } from '@angular/core/testing';

import { ChannelLinkService } from './channel-link.service';
import { FeedService } from './feed.service';
import { ChannelService } from './channel.service';
import { Router } from '@angular/router';
import { LegacyLinkService } from './legacy-link.service';
import { SflWindowRefService } from 'sfl-shared/services';
import { of, throwError } from 'rxjs';
import { Channel } from 'sfl-shared/entities';

describe('ChannelLinkService', () => {

    let feedService: jasmine.SpyObj<FeedService>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let router: jasmine.SpyObj<Router>;
    let legacyLinkService: jasmine.SpyObj<LegacyLinkService>;

    let service: ChannelLinkService;
    let windowRef: SflWindowRefService;

    beforeEach(() => {
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection', 'create']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        legacyLinkService = jasmine.createSpyObj('LegacyLinkService', ['getLegacyLink']);

        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: ChannelService, useValue: channelService},
                {provide: Router, useValue: router},
                {provide: LegacyLinkService, useValue: legacyLinkService},
                {provide: SflWindowRefService, useValue: {nativeWindow: {location: {}}}},
            ],
        });

        service = TestBed.get(ChannelLinkService);
        windowRef = TestBed.get(SflWindowRefService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open a legacy channel page if the channel has at least one category and the feed has configured categories', () => {
        feedService.fetchFeedCollection.and.returnValue(of({total: 1, _embedded: {feed: [{id: 20}]}}));
        feedService.fetchCategoryCollection.and.returnValue(of({_embedded: {category: [{}]}}));
        channelService.getChannelCategories.and.returnValue(of({_embedded: {category: [{}]}}));

        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        service.navigateToChannel(mockChannel());
        expect(feedService.fetchCategoryCollection).toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/shopbot/manage/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });

    it('should open channel setup page if the channel has at least one category but the feed has no configured categories', () => {
        feedService.fetchFeedCollection.and.returnValue(of({total: 1, _embedded: {feed: [{id: 20}]}}));
        feedService.fetchCategoryCollection.and.returnValue(of({_embedded: {category: []}}));
        channelService.getChannelCategories.and.returnValue(of({_embedded: {category: [{}]}}));
        const channel = <any>mockChannel();
        channel.id = 12;
        service.navigateToChannel(channel);
        expect(router.navigate).toHaveBeenCalledWith(['/channel-setup', 12]);
    });

    it('should open a legacy channel page if the channel has no categories', () => {
        feedService.fetchFeedCollection.and.returnValue(of({total: 1, _embedded: {feed: [{id: 20}]}}));
        channelService.getChannelCategories.and.returnValue(of({_embedded: {category: []}}));
        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        service.navigateToChannel(mockChannel());
        expect(feedService.fetchCategoryCollection).not.toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/shopbot/manage/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });

    it('should perform a create feed request and refetch feed when no feed found', () => {
        feedService.fetchFeedCollection.and.returnValues(of({total: 0}), of({total: 1, _embedded: {feed: [{id: 20}]}}));
        channelService.getChannelCategories.and.returnValue(of({_embedded: {category: []}}));
        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        feedService.create.and.returnValue(of({}));
        service.navigateToChannel(mockChannel());
        expect(feedService.create).toHaveBeenCalled();
        expect(feedService.fetchFeedCollection).toHaveBeenCalledTimes(2);
    });

    function mockChannel() {
        return {
            _links: {image: {href: ''}},
            name: 'channel_name',
            type: 'shopbot'
        } as Channel;
    }
});
