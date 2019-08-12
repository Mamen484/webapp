import { TestBed } from '@angular/core/testing';

import { ChannelLinkService } from './channel-link.service';
import { FeedService } from './feed.service';
import { ChannelService } from './channel.service';
import { Router } from '@angular/router';
import { LegacyLinkService } from './legacy-link.service';
import { SflLocaleIdService, SflWindowRefService } from 'sfl-shared/services';
import { of } from 'rxjs';
import { StoreChannel } from 'sfl-shared/entities';

describe('ChannelLinkService', () => {

    let feedService: jasmine.SpyObj<FeedService>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let router: jasmine.SpyObj<Router>;
    let legacyLinkService: jasmine.SpyObj<LegacyLinkService>;
    let localeIdService: SflLocaleIdService;

    let service: ChannelLinkService;
    let windowRef: SflWindowRefService;

    beforeEach(() => {
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection', 'create']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        legacyLinkService = jasmine.createSpyObj('LegacyLinkService', ['getLegacyLink']);
        localeIdService = <any>{localeId: 'en'};
        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: ChannelService, useValue: channelService},
                {provide: Router, useValue: router},
                {provide: LegacyLinkService, useValue: legacyLinkService},
                {provide: SflLocaleIdService, useValue: localeIdService},
                {provide: SflWindowRefService, useValue: {nativeWindow: {location: {}}}},
            ],
        });

        service = TestBed.get(ChannelLinkService);
        windowRef = TestBed.get(SflWindowRefService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it(`should open a legacy channel page if:
       - the channel has at least one category
       - the channel is installed
       - the feed has configured categories
       - the channel type is NOT marketplace`, () => {
        feedService.fetchFeedCollection.and.returnValue(of(<any>{total: 1, _embedded: {feed: [{id: 20}]}}));
        feedService.fetchCategoryCollection.and.returnValue(of(<any>{_embedded: {category: [{}]}}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [{}]}}));

        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        const channel = mockChannel();
        channel.installed = true;
        service.navigateToChannel(channel);
        expect(feedService.fetchCategoryCollection).toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/shopbot/manage/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });

    it(`should open a legacy channel page if:
       - the channel has at least one category
       - the channel is installed
       - the feed has configured categories
       - the channel type is marketplace`, () => {
        feedService.fetchFeedCollection.and.returnValue(of(<any>{total: 1, _embedded: {feed: [{id: 20}]}}));
        feedService.fetchCategoryCollection.and.returnValue(of(<any>{_embedded: {category: [{}]}}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [{}]}}));

        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        const channel = mockChannel();
        channel.installed = true;
        channel._embedded.channel.type = 'marketplace';
        service.navigateToChannel(channel);
        expect(feedService.fetchCategoryCollection).toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });

    it(`should open a feed setup page if
       - the channel has at least one category
       - the channel is installed
       - the feed has NO configured categories`, () => {
        feedService.fetchFeedCollection.and.returnValue(of(<any>{total: 1, _embedded: {feed: [{id: 20}]}}));
        feedService.fetchCategoryCollection.and.returnValue(of(<any>{_embedded: {category: []}}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [{}]}}));
        const channel = <any>mockChannel();
        channel._embedded.channel.id = 12;
        channel.installed = true;
        service.navigateToChannel(channel);
        expect(router.navigate).toHaveBeenCalledWith(['/feed', 20, 'setup']);
    });

    it(`should create a feed and open a feed setup page if
       - the channel has at least one category
       - the channel is NOT installed`, () => {
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [{}]}}));
        feedService.create.and.returnValue(of(<any>{id: 20}));
        const channel = <any>mockChannel();
        channel.installed = false;
        service.navigateToChannel(channel);
        expect(router.navigate).toHaveBeenCalledWith(['/feed', 20, 'setup']);
    });

    it(`should open a legacy channel page if
      - the channel has no categories
      - the channel type is NOT marketplace`, () => {
        feedService.fetchFeedCollection.and.returnValue(of(<any>{total: 1, _embedded: {feed: [{id: 20}]}}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: []}}));
        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        service.navigateToChannel(mockChannel());
        expect(feedService.fetchCategoryCollection).not.toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/shopbot/manage/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });

    it(`should open a legacy channel page if
      - the channel has no categories
      - the channel type is marketplace`, () => {
        feedService.fetchFeedCollection.and.returnValue(of(<any>{total: 1, _embedded: {feed: [{id: 20}]}}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: []}}));
        legacyLinkService.getLegacyLink.and.returnValue('/some-link');
        const channel = mockChannel();
        channel._embedded.channel.type = 'marketplace';
        service.navigateToChannel(channel);
        expect(feedService.fetchCategoryCollection).not.toHaveBeenCalled();
        expect(legacyLinkService.getLegacyLink).toHaveBeenCalledWith('/channel_name');
        expect(windowRef.nativeWindow.location.href).toBe('/some-link');
    });


    function mockChannel() {
        return {
            store: 27,
            channel: 99,
            stats: {},
            statistics: {},
            _embedded: {
                channel: {
                    _links: {image: {href: ''}},
                    name: 'channel_name',
                    type: 'shopbot',

                }
            },
            _links: {},
            installed: false,
        } as StoreChannel;
    }
});
