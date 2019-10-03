import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../src/app/core/entities/app-state';
import { SflUserService } from 'sfl-shared/services';
import { of } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { environment } from '../../environments/environment';
import { ChannelOperatorsAppLinkService } from './channel-operators-app-link.service';

describe('ChannelOperatorsAppLinkService', () => {
    let userService: jasmine.SpyObj<SflUserService>;

    beforeEach(() => {
        userService = jasmine.createSpyObj('UserService spy', ['fetchAggregatedInfo']);
        TestBed.configureTestingModule({
            providers: [
                {provide: SflUserService, useValue: userService},
            ],
        })
    });

    it('should be created', () => {
        const service: ChannelOperatorsAppLinkService = TestBed.get(ChannelOperatorsAppLinkService);
        expect(service).toBeTruthy();
    });

    it('should return a valid link', async () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({token: 'some_token'})));
        const service: ChannelOperatorsAppLinkService = TestBed.get(ChannelOperatorsAppLinkService);
        expect(await service.getLink('/some/link').toPromise())
            .toBe(environment.channelOperatorLink + '/some/link?token=some_token');
    });

    it('should return a link with additional param', async () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({token: 'some_token'})));
        const service: ChannelOperatorsAppLinkService = TestBed.get(ChannelOperatorsAppLinkService);
        expect(await service.getLink('/some/link', new URLSearchParams({channelId: '57'})).toPromise())
            .toBe(environment.channelOperatorLink + '/some/link?channelId=57&token=some_token');
    });
});
