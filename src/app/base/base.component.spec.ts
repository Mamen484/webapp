import { EMPTY, of, Subject } from 'rxjs';
import { BaseComponent } from './base.component';
import { environment } from '../../environments/environment';
import { SflLocaleIdService, SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TagsService } from '../core/services/tags.service';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { FullstoryLoaderService } from '../core/services/fullstory-loader.service';
import { AppcuesService } from './appcues/appcues.service';

describe('BaseComponent', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let storeService: jasmine.SpyObj<StoreService>;

    let router = <any>{};
    let windowRef = <any>{};
    let location: jasmine.SpyObj<Location>;
    let userService: jasmine.SpyObj<SflUserService>;
    let tagsService: jasmine.SpyObj<TagsService>;
    let zendeskService: jasmine.SpyObj<ngxZendeskWebwidgetService>;
    let fullstoryLoaderService: jasmine.SpyObj<FullstoryLoaderService>;
    let appcuesService: jasmine.SpyObj<AppcuesService>;

    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);

        storeService = jasmine.createSpyObj('StoreService', ['getStoreChannels']);
        tagsService = jasmine.createSpyObj('TagsService', ['fetchAll']);
        zendeskService = jasmine.createSpyObj('ngxZendeskWebwidgetService spy', ['setLocale', 'setSettings', 'show']);
        fullstoryLoaderService = jasmine.createSpyObj('FullstoryLoaderService spy', ['load']);
        appcuesService = jasmine.createSpyObj('Appcues Spy', ['enable']);

        router.events = new Subject();
        windowRef.nativeWindow = {
            gtag: jasmine.createSpy(),
            Appcues: {identify: jasmine.createSpy()},
            Autopilot: jasmine.createSpyObj('Autopilot', ['run'])
        };
        location = jasmine.createSpyObj(['path']);
        location.path.and.returnValue('/');
        store.select.and.returnValue(EMPTY);

        TestBed.configureTestingModule({
            declarations: [BaseComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: store},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflUserService, useValue: userService},
                {provide: StoreService, useValue: storeService},
                {provide: Router, useValue: router},
                {provide: TagsService, useValue: tagsService},
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: ngxZendeskWebwidgetService, useValue: zendeskService},
                {provide: FullstoryLoaderService, useValue: fullstoryLoaderService},
                {provide: AppcuesService, useValue: appcuesService},
            ]
        });

        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
        component.testing = true;
    });

    afterEach(() => {
        // clean classList to avoid side effects
        document.body.classList.remove('sf-chat-enabled');
    });


    it('should run `autopilot associate()` with store\'s name and user\'s email when stores name equals user\'s login', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        store.select.and.returnValue(
            of({name: 'login1', permission: {}})
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.Autopilot.run).toHaveBeenCalledWith('associate', {
            _simpleAssociate: true,
            Email: 'email1',
            FirstName: 'login1',
        });
    });

    it('should run `autopilot associate()` with default name and email when the user\'s login differs from the store\'s name', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        store.select.and.returnValue(
            of({name: 'login2', permission: {}})
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.Autopilot.run).toHaveBeenCalledWith('associate', {
            _simpleAssociate: true,
            Email: environment.DEFAULT_AUTOPILOT_EMAIL,
            FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
        });
    });

    it('should NOT run `autopilot associate()` when the user is admin', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            login: 'login1',
            email: 'email1',
            roles: ['admin']
        })));
        store.select.and.returnValue(
            of({name: 'login2', permission: {}})
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.Autopilot.run).not.toHaveBeenCalled();
    });

    it('should run gtag if a user is not an admin', () => {
        userService.fetchAggregatedInfo.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledTimes(1);
    });

    it('should NOT run gtag if a user is an admin', () => {
        userService.fetchAggregatedInfo.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).not.toHaveBeenCalled();
    });

    it('should run fullstory code if the user is not admin, the store is created less then 7 days before' +
        ' and the country is US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(fullstoryLoaderService.load).toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role admin', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role employee', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['employee'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store is created more then then 7 days before', () => {
        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            createdAt: '2025-12-10T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store country is not US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'FR',
            createdAt: '2025-12-15T12:26:21+00:00',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(fullstoryLoaderService.load).not.toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', permission: {}, feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(appcuesService.enable).toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is admin', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}, permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(appcuesService.enable).not.toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is NOT US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'FR', name: 'some_name', feed: {source: 'Shopify'}, permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(appcuesService.enable).toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is US and the source is NOT shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'prestashop'}, permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(appcuesService.enable).toHaveBeenCalled();
    });

    it('should show zendesk chat if a store has a chat permission', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {chat: '*'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(zendeskService.setLocale).toHaveBeenCalledWith('en');
        expect(zendeskService.setSettings).toHaveBeenCalled();
        expect(zendeskService.show).toHaveBeenCalled();
    });

    it('should NOT show zendesk chat if a store does NOT have a chat permission', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(zendeskService.setLocale).not.toHaveBeenCalled();
        expect(zendeskService.setSettings).not.toHaveBeenCalled();
        expect(zendeskService.show).not.toHaveBeenCalled();
    });

    it('should add sf-chat-enabled class to document body when the chat is enabled', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {chat: '*'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(document.body.classList).toContain('sf-chat-enabled');
    });

    it('should NOT add sf-chat-enabled class to document body when the chat is NOT enabled', () => {
        store.select.and.returnValue(of({id: 'some_id', permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(document.body.classList).not.toContain('sf-chat-enabled');
    });
});
