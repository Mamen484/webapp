import { TestBed } from '@angular/core/testing';

import { SetupResolverGuard } from './setup-resolver.guard';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

describe('SetupResolverGuard', () => {
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let router: jasmine.SpyObj<Router>;
    let guard: SetupResolverGuard;

    beforeEach(() => {
        channelService = jasmine.createSpyObj('ChannelService', ['getChannel']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeed']);
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
        feedService.fetchFeed.and.returnValue(of(<any>{channelId: 20}));
        guard.resolve(<any>{params: {feedId: 20}}, <any>{}).pipe(catchError(() => of({}))).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['channel-not-found'])
    });

    it('should redirect to a feed-not-found error page when fetch feed returned an error', () => {
        channelService.getChannel.and.returnValue(of(<any>{}));
        feedService.fetchFeed.and.returnValue(throwError({}));
        guard.resolve(<any>{params: {feedId: 20}}, <any>{}).pipe(catchError(() => of({}))).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['feed-not-found'])
    });

    it('should resolve an object when the channel returns success and feed categories array is not empty', async () => {
        channelService.getChannel.and.returnValue(of(<any>{id: 3}));
        feedService.fetchFeed.and.returnValue(of(<any>{id: 2, channelId: 3}));
        const resolved = guard.resolve(<any>{params: {feedId: 2}}, <any>{});
        expect(router.navigate).not.toHaveBeenCalled();
        expect(await resolved.toPromise()).toEqual(<any>{channel: {id: 3}, feed: {id: 2, channelId: 3}});
    });
});
