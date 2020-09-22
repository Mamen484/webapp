import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreComponent } from './create-store.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SquarespaceService } from '../squarespace.service';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { SflAuthService, SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';

describe('CreateStoreComponent', () => {
    let component: CreateStoreComponent;
    let fixture: ComponentFixture<CreateStoreComponent>;
    let route: { data: Subject<Object> };
    let service: jasmine.SpyObj<SquarespaceService>;
    let storeService: jasmine.SpyObj<StoreService>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let router: jasmine.SpyObj<Router>;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(async(() => {
        route = <any>{data: new Subject()};
        service = jasmine.createSpyObj('SquarespaceService', ['getStore']);
        storeService = jasmine.createSpyObj('StoreService', ['createStore']);
        localStorage = jasmine.createSpyObj('SflLocalStorageService', ['getItem', 'setItem', 'removeItem']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        authService = jasmine.createSpyObj('SflAuthService', ['loginByToken']);

        TestBed.configureTestingModule({
            declarations: [CreateStoreComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: route},
                {provide: SquarespaceService, useValue: service},
                {provide: StoreService, useValue: storeService},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: Router, useValue: router},
                {provide: SflAuthService, useValue: authService},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create a SF store', () => {
        storeService.createStore.and.returnValue(EMPTY);
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.data.next({
            spStore: {
                accessToken: '6709rrr75974e807ebc987a75a6bfd897',
                refreshToken: '6709rrr75974e807ebc987a75a6bfd896',
                tokenExpiresAt: 1553532363.542,
                language: 'en',
                storeId: null,
                feed: 'https://domain/lib/import/some_feed_url',
                sfToken: '4679rrr75974e807ebc987a75a6bfd290',
                name: 'sfdev, 12345',
            }
        });

        expect(Object.keys(storeService.createStore.calls.mostRecent().args[0])).toEqual(['owner', 'feed', 'country', 'paymentType', 'planName', 'storeId']);

        expect(storeService.createStore.calls.mostRecent().args[0].owner).toEqual({
            email: 'some@email.com',
            login: 'sfdev, 12345',
            password: '1234567',
            token: '4679rrr75974e807ebc987a75a6bfd290',
            payment: 'other'
        });
        expect(storeService.createStore.calls.mostRecent().args[0].feed).toEqual({
            url: 'https://domain/lib/import/some_feed_url',
            source: 'squarespace',
            mapping: {
                'category': 'category',
                'brand': 'brand',
                'reference': 'reference',
                'ean': 'ean',
                'name': 'name',
                'link': 'link',
                'description': 'description',
                'short_description': 'short_description',
                'price': 'price',
                'old_price': 'old_price',
                'shipping_cost': 'shipping_cost',
                'shipping_time': 'shipping_time',
                'quantity': 'quantity',
                'weight': 'weight',
                'ecotax': 'ecotax',
                'tva': 'tva',
            },
            settings: {
                xmlProductNode: 'product', credentials: {
                    type: 'oauth2',
                    accessToken: '6709rrr75974e807ebc987a75a6bfd897',
                    refreshToken: '6709rrr75974e807ebc987a75a6bfd896',
                    expiryTimeAccessToken: '1553532363.542',
                    expiryTimeRefreshToken: '1553532363.542',
                }
            }
        });
        expect(storeService.createStore.calls.mostRecent().args[0].country).toEqual('us');
        expect(storeService.createStore.calls.mostRecent().args[0].storeId).toEqual(null);
        expect(storeService.createStore.calls.mostRecent().args[0].paymentType).not.toBeDefined();
    });

    it('should login a user if the store is created successfully', () => {
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.data.next({spStore: {}});

        expect(authService.loginByToken).toHaveBeenCalledWith('someToken');
    });

    it('should remove squarespace state from local storage if the store is created successfully', () => {
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.data.next({spStore: {}});

        expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKey.squarespaceState);
    });

    it('should redirect to the /register/create-account path if the store is created successfully', () => {
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.data.next({spStore: {}});

        expect(router.navigate).toHaveBeenCalledWith(['register', 'create-account']);
    });

    it('should redirect to the squarespace error page if the store creation failed', () => {
        storeService.createStore.and.returnValue(throwError({}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.data.next({spStore: {}});

        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
    });
});
