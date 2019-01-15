import { TestBed } from '@angular/core/testing';

import { SetupResolverGuard } from './setup-resolver.guard';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SetupResolverGuard', () => {
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let router: jasmine.SpyObj<Router>;
    let guard: SetupResolverGuard;

    beforeEach(() => {
        channelService = jasmine.createSpyObj('ChannelService', ['getChannel']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection']);
        router = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                SetupResolverGuard,
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: Router, useValue: router},
            ]
        });

        guard = TestBed.get(SetupResolverGuard);
    });

    it('should redirect to a channel-not-found error page when the channel endpoint returned an error', () => {
        channelService.getChannel.and.returnValue(throwError({}));
        feedService.fetchFeedCollection.and.returnValue(of({}));
        guard.resolve(<any>{params: {channelId: 20}}, <any>{}).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['channel-not-found'])
    });

    it('should redirect to a feed-not-found error page when the feed categories endpoint returned 0 categories', () => {
        channelService.getChannel.and.returnValue(of({}));
        feedService.fetchFeedCollection.and.returnValue(of({_embedded: {feed: []}}));
        guard.resolve(<any>{params: {channelId: 20}}, <any>{}).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['feed-not-found'])
    });

    it('should resolve an object when the channel returns success and feed categories array is not empty', async () => {
        channelService.getChannel.and.returnValue(of({id: 3}));
        feedService.fetchFeedCollection.and.returnValue(of({_embedded: {feed: [{id: 2}]}}));
        const resolved = guard.resolve(<any>{params: {channelId: 20}}, <any>{});
        expect(router.navigate).not.toHaveBeenCalled();
        expect(await resolved.toPromise()).toEqual(<any>{channel: {id: 3}, feed: {id: 2}});
    });
});
