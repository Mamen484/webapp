import { TestBed } from '@angular/core/testing';

import { ChannelResolveGuard } from './channel-resolve.guard';
import { ChannelService, SflUserService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';

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

    it('should fetch a channel with id from params if the user is an admin', () => {
        channelService.fetchChannel.and.returnValue(EMPTY);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
        guard.resolve(<any>{queryParamMap: new Map().set('channelId', 88)}, <any>{}).subscribe();
        expect(channelService.fetchChannel).toHaveBeenCalledWith(88);
    });

    it('should NOT fetch a channel if the user is an admin but channelId is not specified', () => {
        channelService.fetchChannel.and.returnValue(EMPTY);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
        guard.resolve(<any>{queryParamMap: new Map()}, <any>{}).subscribe();
        expect(channelService.fetchChannel).not.toHaveBeenCalled();
    });

    it('should return a channel', async () => {
        channelService.fetchChannel.and.returnValue(of({id: 90}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
        expect(await guard.resolve(<any>{queryParamMap: new Map().set('channelId', 90)}, <any>{}).toPromise())
            .toEqual(<any>{id: 90});
    });

    it('should fetch a channel with id from userInfo if the user is NOT an admin', () => {
        channelService.fetchChannel.and.returnValue(EMPTY);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {channel: [{id: 909}]}})));
        guard.resolve(<any>{}, <any>{}).subscribe();
        expect(channelService.fetchChannel).toHaveBeenCalledWith(909);
    });

    it('should NOT fetch a channel if the user is NOT admin and the channel does not exist in userInfo', () => {
        channelService.fetchChannel.and.returnValue(EMPTY);
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user']})));
        guard.resolve(<any>{}, <any>{}).subscribe();
        expect(channelService.fetchChannel).not.toHaveBeenCalled();
    });

    it('should return a channel', async () => {
        channelService.fetchChannel.and.returnValue(of({id: 119}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], _embedded: {channel: [{id: 909}]}})));
        expect(await guard.resolve(<any>{}, <any>{}).toPromise()).toEqual(<any>{id: 119});
    });
});
