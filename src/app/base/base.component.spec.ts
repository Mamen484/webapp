import { EMPTY, of, Subject } from 'rxjs';
import { BaseComponent } from './base.component';
import { environment } from '../../environments/environment';
import { SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TagsService } from '../core/services/tags.service';

describe('BaseComponent', () => {

    let store: jasmine.SpyObj<Store<AppState>>;
    let storeService: jasmine.SpyObj<StoreService>;

    let router = <any>{};
    let windowRef = <any>{};
    let location: jasmine.SpyObj<Location>;
    let userService: jasmine.SpyObj<SflUserService>;
    let tagsService: jasmine.SpyObj<TagsService>;

    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);

        storeService = jasmine.createSpyObj('StoreService', ['getStoreChannels']);
        tagsService = jasmine.createSpyObj('TagsService', ['fetchAll']);

        router.events = new Subject();
        windowRef.nativeWindow = {
            gtag: jasmine.createSpy(), FS: {identify: jasmine.createSpy()},
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
            ]
        });

        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
    });


    it('should run `autopilot associate()` with store\'s name and user\'s email when stores name equals user\'s login', () => {
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({login: 'login1', email: 'email1', roles: ['user']})));
        store.select.and.returnValue(
            of({name: 'login1'})
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
            of({name: 'login2'})
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
            of({name: 'login2'})
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

    it('should NOT show livechat if a user is an admin and country is US', () => {
        store.select.and.returnValue(of({country: 'US'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'})));
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should NOT show livechat if a user is an NOT admin and country is NOT US', () => {
        store.select.and.returnValue(of({country: 'FR'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})));
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should show livechat if a user is an NOT admin and country is US', () => {
        store.select.and.returnValue(of({country: 'US'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})));
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(true);
    });

    it('should run fullstory code if the user is not admin, the store is created less then 7 days before' +
        ' and the country is US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledWith('some_id', {
            displayName: 'some_name',
            email: 'some_email',
        });
    });

    it('should NOT run fullstory code if the user has role admin', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role employee', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['employee'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store is created more then then 7 days before', () => {
        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({id: 'some_id', country: 'US', createdAt: '2025-12-10T12:26:21+00:00', name: 'some_name'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store country is not US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        store.select.and.returnValue(of({id: 'some_id', country: 'FR', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is admin and the country is US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is not admin and the country is NOT US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'FR', name: 'some_name', feed: {source: 'Shopify'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is not admin and the country is US and the source is NOT shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'prestashop'}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });
});
