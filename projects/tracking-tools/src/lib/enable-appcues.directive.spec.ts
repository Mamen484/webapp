import { EnableAppcuesDirective } from './enable-appcues.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../src/app/core/entities/app-state';
import { SflUserService } from 'sfl-shared/services';
import { Renderer2 } from '@angular/core';
import { of, Subject } from 'rxjs';
import { AggregatedUserInfo } from 'sfl-shared/entities';

describe('EnableAppcuesDirective', () => {

    let directive: EnableAppcuesDirective;
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
        renderer = jasmine.createSpyObj('Renderer2 spy', ['createElement', 'appendChild']);

        directive = new EnableAppcuesDirective(
            windowRef,
            store,
            userService,
            router,
            renderer,
        );

        store.select.and.returnValue(of({
            id: 'some_id',
            country: 'US',
            name: 'some_name',
            createdAt: 12345678,
            permission: {},
            feed: {source: 'Shopify'}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email',
        })));
    })

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should call identify with correct params', () => {
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        directive.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify.calls.mostRecent().args[1]).toEqual({
            name: 'some_name',
            email: 'some_email',
            country: 'US',
            feed_source: 'Shopify',
            created_at: 12345678,
        });
    });



    it('should run Appcues code if the user is not admin and the country is US and the source is shopify', () => {
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
        directive.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify).toHaveBeenCalled();
    });

    it('should NOT run Appcues code if the user is admin', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'Shopify'}, permission: {}}));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['admin'],
            token: 'token_1',
            email: 'some_email'
        })));
        renderer.createElement.and.returnValue({
            set onload(callback) {
                callback()
            }
        });
        directive.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify).not.toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is NOT US and the source is shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'FR', name: 'some_name', feed: {source: 'Shopify'}, permission: {}}));
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
        directive.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify).toHaveBeenCalled();
    });

    it('should run Appcues code if the user is not admin and the country is US and the source is NOT shopify', () => {
        store.select.and.returnValue(of({id: 'some_id', country: 'US', name: 'some_name', feed: {source: 'prestashop'}, permission: {}}));
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
        directive.ngOnInit();
        expect(windowRef.nativeWindow.Appcues.identify).toHaveBeenCalled();
    });
});
