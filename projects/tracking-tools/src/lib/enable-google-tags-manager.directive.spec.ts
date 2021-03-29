import { EnableGoogleAnalyticsDirective } from './enable-google-analytics.directive';
import { SflUserService } from 'sfl-shared/services';
import { NavigationEnd, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { from, of } from 'rxjs';
import { AggregatedUserInfo, Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { EnableGoogleTagsManagementDirective } from './enable-google-tags-manager.directive';

describe('EnableGoogleTagsManagerDirective', () => {

    let directive: EnableGoogleTagsManagementDirective;
    let userService: jasmine.SpyObj<SflUserService>;
    let router: Router;
    let renderer: jasmine.SpyObj<Renderer2>;
    let appStore: jasmine.SpyObj<Store<{currentStore: UserStore}>>;


    beforeEach(() => {
        appStore = jasmine.createSpyObj(['select']);
        userService = jasmine.createSpyObj(['fetchAggregatedInfo']);
        renderer = jasmine.createSpyObj(['appendChild'])
    });
    it('should create an instance', () => {
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            {nativeWindow: {}},
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        expect(directive).toBeTruthy();
    });

    it('should assign dataLayer', () => {
        jasmine.clock().mockDate(new Date(1611391123750));
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'], email: 'some-email@shopping-feed.com'
        })));
        appStore.select.and.returnValue(of({
            id: 25,
            name: 'my-test-store-513',
            feed: {source: 'Shopify'},
            country: 'espagna',
            createdAt: 'Sat Jan 16 2021 09:15:23 GMT+0200',
            permission: {chat: '*'},
        }));
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.dataLayer[0]).toEqual(
            {
                'Email': 'some-email@shopping-feed.com',
                'Id': 25,
                'Name': 'my-test-store-513',
                'Role': 'user',
                'Country': 'espagna',
                'CreatedAt': 'Sat Jan 16 2021 09:15:23 GMT+0200',
                'CreatedSince': 7,
                'FeedType': 'Shopify',
                'ChatEnabled': true,
                'Locale': 'es',
            }
        );
    });

    it('should assign gtag function if not admin', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        appStore.select.and.returnValue(of({id: 25, feed: {source: 'Shopify'}}));
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(typeof windowRef.nativeWindow.gtag).toBe('function');
    });

    it('should assign gtag function if admin', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
        })));
        appStore.select.and.returnValue(of({id: 25, feed: {source: 'Shopify'}}));
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(typeof windowRef.nativeWindow.gtag).toBe('function');
    });

    it('should append a script to a document body', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        appStore.select.and.returnValue(of({id: 25, feed: {source: 'Shopify'}}));
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should log an error into console when no if specified', () => {
        const spy = spyOn(console, 'error');
        directive = new EnableGoogleTagsManagementDirective(
            undefined,
            <any>{},
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call gtag config', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'some-token'
        })));
        appStore.select.and.returnValue(of({id: 25, feed: {source: 'Shopify'}}));
        let spy;
        renderer.appendChild.and.callFake((body, script) => {
            spy = spyOn(windowRef.nativeWindow, 'gtag');
            script.onload();
        })
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledWith('config', 'some-id', {user_id: 'some-token'});
    });

    it('should call gtag config with page_path on spa`s', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        appStore.select.and.returnValue(of({id: 25, feed: {source: 'Shopify'}}));
        let spy;
        renderer.appendChild.and.callFake((body, script) => {
            spy = spyOn(windowRef.nativeWindow, 'gtag');
            script.onload();
        })
        directive = new EnableGoogleTagsManagementDirective(
            'some-id',
            windowRef,
            userService,
            <any>{events: from([new NavigationEnd(1, '/some-url', '/some-url')])},
            renderer,
            <any>{localeId: 'es'},
            appStore,
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledWith('config', 'some-id',  {'page_path': '/some-url'});
    });
});
