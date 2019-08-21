import { inject, TestBed } from '@angular/core/testing';

import { ChannelResolveGuard } from './channel-resolve.guard';
import { ChannelService, SflUserService } from 'sfl-shared/services';

describe('ChannelResolveGuard', () => {

    let channelService: jasmine.SpyObj<ChannelService>;
    let userService: jasmine.SpyObj<SflUserService>;

    beforeEach(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['fetchChannel']);
        userService = jasmine.createSpyObj('SflUserService spy', ['fetchAggregatedInfo']);
        TestBed.configureTestingModule({
            providers: [
                ChannelResolveGuard,
                {provide: ChannelService, useValue: channelService},
                {provide: SflUserService, useValue: userService},
            ]
        });
    });

    it('should ...', inject([ChannelResolveGuard], (guard: ChannelResolveGuard) => {
        expect(guard).toBeTruthy();
    }));
});
