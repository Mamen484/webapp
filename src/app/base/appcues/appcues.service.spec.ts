import { TestBed } from '@angular/core/testing';

import { AppcuesService } from './appcues.service';
import { take } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Router } from '@angular/router';
import { AppcuesState } from './appcues-state.enum';
import { AppState } from '../../core/entities/app-state';

describe('AppcuesService', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let router = <any>{};
    let windowRef = <any>{};

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        windowRef.nativeWindow = {Appcues: {identify: jasmine.createSpy()}};
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store},
                {provide: SflUserService, useValue: userService},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: windowRef},
            ],
        })
    });

    it('should be created', () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        expect(service).toBeTruthy();
    });

    it('should emit `enabled` event on enable()', async () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        service.enable();
        expect(await service.getState().pipe(take(1)).toPromise()).toBe(AppcuesState.enabled);
    });

    it('should emit `loaded` event on markLoaded()', async () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        service.enable();
        expect(await service.getState().pipe(take(1)).toPromise()).toBe(AppcuesState.enabled);
    });


});
