import { TestBed } from '@angular/core/testing';

import { SetupResolverGuard } from './setup-resolver.guard';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';
import { Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

describe('SetupResolverGuard', () => {
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let router: jasmine.SpyObj<Router>;
    let guard: SetupResolverGuard;
    let store: jasmine.SpyObj<Store<AppState>>;

    beforeEach(() => {
        channelService = jasmine.createSpyObj('ChannelService', ['getChannel']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeed']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        store = jasmine.createSpyObj(['select']);

        TestBed.configureTestingModule({
            providers: [
                SetupResolverGuard,
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: Router, useValue: router},
                {provide: Store, useValue: store},
            ]
        });

        guard = TestBed.inject(SetupResolverGuard);
    });

    it('should redirect to a channel-not-found error page when the channel endpoint returned an error', () => {
        channelService.getChannel.and.returnValue(throwError({}));
        feedService.fetchFeed.and.returnValue(of(<any>{channelId: 20, catalogId: 34}));
        const store$ = new Subject();
        store.select.and.returnValue(store$);
        guard.resolve(<any>{params: {feedId: 20}}, <any>{}).pipe(catchError(() => of({}))).subscribe();
        store$.next({id: 34});
        expect(router.navigate).toHaveBeenCalledWith(['channel-not-found'])
    });

    it('should redirect to a feed-not-found error page when fetch feed returned an error', () => {
        channelService.getChannel.and.returnValue(of(<any>{}));
        feedService.fetchFeed.and.returnValue(throwError({}));
        const store$ = new Subject();
        store.select.and.returnValue(store$);
        guard.resolve(<any>{params: {feedId: 20}}, <any>{}).pipe(catchError(() => of({}))).subscribe();
        store$.next({id: 34});
        expect(router.navigate).toHaveBeenCalledWith(['feed-not-found'])
    });

    it('should resolve an object when the channel returns success and feed categories array is not empty', () => {
        channelService.getChannel.and.returnValue(of(<any>{id: 3}));
        feedService.fetchFeed.and.returnValue(of(<any>{id: 2, channelId: 3, catalogId: 34}));
        const store$ = new Subject();
        store.select.and.returnValue(store$);
        let resolved;
        guard.resolve(<any>{params: {feedId: 2}}, <any>{}).subscribe(data => resolved = data);
        store$.next({id: 34});
        expect(router.navigate).not.toHaveBeenCalled();
        expect(resolved).toEqual(<any>{channel: {id: 3}, feed: {id: 2, channelId: 3, catalogId: 34}});
    });

    it ('should redirect to a feed-not-found error page when the feed catalog id is different from the user`s store id', () => {
        channelService.getChannel.and.returnValue(of(<any>{id: 3}));
        feedService.fetchFeed.and.returnValue(of(<any>{id: 20, channelId: 3, catalogId: 34}));
        const store$ = new Subject();
        store.select.and.returnValue(store$);
        guard.resolve(<any>{params: {feedId: 20}}, <any>{}).pipe(catchError(() => of({}))).subscribe();
        store$.next({id: 15});
        expect(router.navigate).toHaveBeenCalledWith(['feed-not-found']);
    });
});
