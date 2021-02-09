import { EnableGoogleAnalyticsDirective } from './enable-google-analytics.directive';
import { SflUserService } from 'sfl-shared/services';
import { NavigationEnd, Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { from, of } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';

describe('EnableGoogleAnalyticsDirective', () => {

    let directive: EnableGoogleAnalyticsDirective;
    let userService: jasmine.SpyObj<SflUserService>;
    let router: Router;
    let renderer: jasmine.SpyObj<Renderer2>;


    beforeEach(() => {
        userService = jasmine.createSpyObj(['fetchAggregatedInfo']);
        renderer = jasmine.createSpyObj(['appendChild'])
    });
    it('should create an instance', () => {
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            {nativeWindow: {}},
            userService,
            <any>{},
            renderer
        );
        expect(directive).toBeTruthy();
    });

    it('should assign dataLayer', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.dataLayer[0][0]).toBe('js');
    });

    it('should assign gtag function if not admin', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer
        );
        directive.ngOnInit();
        expect(typeof windowRef.nativeWindow.gtag).toBe('function');
    });

    it('should NOT assign gtag function if admin', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
        })));
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer
        );
        directive.ngOnInit();
        expect(typeof windowRef.nativeWindow.gtag).toBe('undefined');
    });

    it('should append a script to a document body', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer
        );
        directive.ngOnInit();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should log an error into console when no if specified', () => {
        const spy = spyOn(console, 'error');
        directive = new EnableGoogleAnalyticsDirective(
            undefined,
            <any>{},
            userService,
            <any>{},
            renderer
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
        let spy;
        renderer.appendChild.and.callFake((body, script) => {
            spy = spyOn(windowRef.nativeWindow, 'gtag');
            script.onload();
        })
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{},
            renderer
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledWith('config', 'some-id', {user_id: 'some-token'});
    });

    it('should call gtag config with page_path on spa`s', () => {
        const windowRef: any = {nativeWindow: {}};
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
        })));
        let spy;
        renderer.appendChild.and.callFake((body, script) => {
            spy = spyOn(windowRef.nativeWindow, 'gtag');
            script.onload();
        })
        directive = new EnableGoogleAnalyticsDirective(
            'some-id',
            windowRef,
            userService,
            <any>{events: from([new NavigationEnd(1, '/some-url', '/some-url')])},
            renderer
        );
        directive.ngOnInit();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledWith('config', 'some-id',  {'page_path': '/some-url'});
    });
});
