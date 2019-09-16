import { TestBed } from '@angular/core/testing';

import { AppLinkService } from './app-link.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../src/app/core/entities/app-state';
import { SflUserService } from 'sfl-shared/services';
import { of } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { environment } from '../../environments/environment';

describe('AppLinkService', () => {
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;

    beforeEach(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        userService = jasmine.createSpyObj('UserService spy', ['fetchAggregatedInfo']);
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: appStore},
                {provide: SflUserService, useValue: userService},
            ],
        })
    });

    it('should be created', () => {
        const service: AppLinkService = TestBed.get(AppLinkService);
        expect(service).toBeTruthy();
    });

    it('should return a valid link', async () => {
        appStore.select.and.returnValue(of({id: 90909}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({token: 'some_token'})));
        const service: AppLinkService = TestBed.get(AppLinkService);
        expect(await service.getLink('/some/link').toPromise())
            .toBe(environment.webappLink + '/some/link?token=some_token&store=90909');
    });
});
