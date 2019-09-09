import { TestBed } from '@angular/core/testing';

import { ChannelResolveGuard } from './channel-resolve.guard';
import { ChannelService, SflUserService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';

describe('ChannelResolveGuard', () => {

    let channelService: jasmine.SpyObj<ChannelService>;
    let userService: jasmine.SpyObj<SflUserService>;
    let guard: ChannelResolveGuard;

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

    beforeEach(() => {
        guard = TestBed.get(ChannelResolveGuard);
    });

    it('should fetch a channel with id from params', () => {
        channelService.fetchChannel.and.returnValue(EMPTY);
        guard.resolve(<any>{queryParamMap: new Map().set('channelId', 88)}, <any>{}).subscribe();
        expect(channelService.fetchChannel).toHaveBeenCalledWith(88);
    });

    it('should return a channel', async () => {
        channelService.fetchChannel.and.returnValue(of({id: 90}));
        expect(await guard.resolve(<any>{queryParamMap: new Map().set('channelId', 90)}, <any>{}).toPromise())
            .toEqual({id: 90});
    });
});
