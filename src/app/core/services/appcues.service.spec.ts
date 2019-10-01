import { TestBed } from '@angular/core/testing';

import { AppcuesService } from './appcues.service';
import { take } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Router } from '@angular/router';

describe('AppcuesService', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let router = <any>{};
    let windowRef = <any>{};
    let renderer: jasmine.SpyObj<Renderer2>;


    beforeEach(() => {

        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        windowRef.nativeWindow = {Appcues: {identify: jasmine.createSpy()}};
        renderer = jasmine.createSpyObj('Renderer2 spy', ['appendChild', 'createElement']);
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store},
                {provide: SflUserService, useValue: userService},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: Renderer2, useValue: renderer},
            ],
        })
    });

    it('should be created', () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        expect(service).toBeTruthy();
    });

    it('should change state on setEnabled()', async () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        expect(await service.getState().pipe(take(1)).toPromise()).toBe(false);
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        service.enable();
        expect(await service.getState().pipe(take(1)).toPromise()).toBe(true);
    });

    it('should run Appcues code on enable() call', () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        service.enable();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should run Appcues code only once', () => {
        const service: AppcuesService = TestBed.get(AppcuesService);
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        service.enable();
        service.enable();
        expect(renderer.createElement).toHaveBeenCalledTimes(1);
    });
});
