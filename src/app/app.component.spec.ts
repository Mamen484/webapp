import { AppComponent } from './app.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SflWindowRefService } from 'sfl-shared';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { AggregatedUserInfo } from './core/entities/aggregated-user-info';
import { Location } from '@angular/common';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let router = <any>{};
    let windowRef = <any>{};
    let location: jasmine.SpyObj<Location>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        router.events = new Subject();
        windowRef.nativeWindow = {gtag: jasmine.createSpy(), FS: {identify: jasmine.createSpy()}, Appcues: {identify: jasmine.createSpy()}};
        location = jasmine.createSpyObj(['path']);
        location.path.and.returnValue('/');
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: Location, useValue: location},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run gtag if a user is not an admin', () => {
        appStore.select.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledTimes(1);
    });

    it('should NOT run gtag if a user is an admin', () => {
        appStore.select.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).not.toHaveBeenCalled();
    });

    it('should NOT show livechat if a user is an admin and country is US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'})),
            of({country: 'US'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should NOT show livechat if a user is an NOT admin and country is NOT US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})),
            of({country: 'FR'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should show livechat if a user is an NOT admin and country is US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})),
            of({country: 'US'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(true);
    });

    it('should run fullstory code if the user is not admin, the store is created less then 7 days before' +
        ' and the country is US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}),
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).toHaveBeenCalledWith('some_id', {
            displayName: 'some_name',
            email: 'some_email',
        });
    });

    it('should NOT run fullstory code if the user has role admin', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}),
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the user has role employee', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['employee'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}),
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store is created more then then 7 days before', () => {
        jasmine.clock().mockDate(new Date('2025-12-20'));
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', createdAt: '2025-12-10T12:26:21+00:00', name: 'some_name'}),
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should NOT run fullstory code if the store country is not US', () => {

        jasmine.clock().mockDate(new Date('2025-12-20'));
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'FR', createdAt: '2025-12-15T12:26:21+00:00', name: 'some_name'}),
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.FS.identify).not.toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is US and the source is shopify', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}}),
        );
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is admin and the country is US and the source is shopify', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}}),
        );
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is not admin and the country is NOT US and the source is shopify', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'FR', name: 'some_name', feed: {source: 'Shopify'}}),
        );
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is not admin and the country is US and the source is NOT shopify', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1', email: 'some_email'})),
            of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'prestashop'}}),
        );
        const renderer = fixture.debugElement.injector.get(Renderer2);
        spyOn(renderer, 'appendChild');
        fixture.detectChanges();
        expect(renderer.appendChild).not.toHaveBeenCalled();
    });
});
