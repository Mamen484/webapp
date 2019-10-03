import { async } from '@angular/core/testing';

import { AppcuesComponent } from './appcues.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { SflLocaleIdService, SflUserService } from 'sfl-shared/services';
import { of, Subject } from 'rxjs';
import { AppcuesService } from './appcues.service';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { AppcuesState } from './appcues-state.enum';
import { Renderer2 } from '@angular/core';

describe('AppcuesComponent', () => {
    let component: AppcuesComponent;

    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let router = <any>{};
    let windowRef = <any>{};
    let appcuesService: jasmine.SpyObj<AppcuesService>;
    let renderer: jasmine.SpyObj<Renderer2>;
    let localeIdService: SflLocaleIdService;


    beforeEach(async(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        windowRef.nativeWindow = {Appcues: {identify: jasmine.createSpy()}};
        appcuesService = jasmine.createSpyObj('AppcuesService spy', ['enable', 'markLoaded', 'getState']);
        renderer = jasmine.createSpyObj('Renderer2 spy', ['createElement', 'appendChild']);
        localeIdService = <any>{};

        component = new AppcuesComponent(
            windowRef, store, userService, appcuesService, localeIdService, router, renderer
        );
    }));

    beforeEach(() => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add a language param if the locale is fr', () => {
        appcuesService.getState.and.returnValue(of(AppcuesState.enabled));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback();
            }
        });
        localeIdService.localeId = 'fr';
        component.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify.calls.mostRecent().args[1].language).toBe('fr');
    });
    it('should NOT add a language param if the locale is en', () => {
        appcuesService.getState.and.returnValue(of(AppcuesState.enabled));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        localeIdService.localeId = 'en';
        component.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify.calls.mostRecent().args[1].language).not.toBeDefined();
    });
});
