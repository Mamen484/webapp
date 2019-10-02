import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcuesComponent } from './appcues.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AppcuesService } from './appcues.service';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { AppcuesState } from './appcues-state.enum';

describe('AppcuesComponent', () => {
    let component: AppcuesComponent;
    let fixture: ComponentFixture<AppcuesComponent>;

    let store: jasmine.SpyObj<Store<AppState>>;
    let userService: jasmine.SpyObj<SflUserService>;
    let router = <any>{};
    let windowRef = <any>{};
    let appcuesService: jasmine.SpyObj<AppcuesService>;


    beforeEach(async(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        windowRef.nativeWindow = {Appcues: {identify: jasmine.createSpy()}};
        appcuesService = jasmine.createSpyObj('AppcuesService spy', ['enable', 'markLoaded', 'getState']);

        TestBed.configureTestingModule({
            declarations: [AppcuesComponent],
            providers: [
                {provide: Store, useValue: store},
                {provide: SflUserService, useValue: userService},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflLocaleIdService, useValue: {}},
                {provide: AppcuesService, useValue: appcuesService},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppcuesComponent);
        component = fixture.componentInstance;
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

    it('should load the script when appcuesService emits an enabled event', () => {
        appcuesService.getState.and.returnValue(of(AppcuesState.enabled));
        fixture.detectChanges();
        expect(component.appcuesEnabled).toBe(true);
    });

    it('should add a language param if the locale is fr', () => {
        appcuesService.getState.and.returnValue(of(AppcuesState.enabled));
        const localeIdService = TestBed.get(SflLocaleIdService);
        localeIdService.localeId = 'fr';
        component.loaded();
        expect(windowRef.nativeWindow.Appcues.identify.calls.mostRecent().args[1].language).toBe('fr');
    });
    it('should NOT add a language param if the locale is en', () => {
        appcuesService.getState.and.returnValue(of(AppcuesState.enabled));

        const localeIdService = TestBed.get(SflLocaleIdService);
        localeIdService.localeId = 'en';
        component.loaded();
        expect(windowRef.nativeWindow.Appcues.identify.calls.mostRecent().args[1].language).not.toBeDefined();
    });
});
