import { inject, TestBed } from '@angular/core/testing';

import { SetupResolverGuard } from './setup-resolver.guard';
import { ChannelService } from '../core/services/channel.service';
import { FeedService } from '../core/services/feed.service';

describe('SetupResolverGuard', () => {
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;

    beforeEach(() => {
        channelService = jasmine.createSpyObj('ChannelService', ['getChannel']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection']);
        TestBed.configureTestingModule({
            providers: [
                SetupResolverGuard,
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
            ]
        });
    });

    it('should ...', inject([SetupResolverGuard], (guard: SetupResolverGuard) => {
        expect(guard).toBeTruthy();
    }));
});
