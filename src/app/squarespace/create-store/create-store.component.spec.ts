import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreComponent } from './create-store.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SquarespaceService } from '../squarespace.service';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';
import { PaymentType } from 'sfl-shared/entities';

describe('CreateStoreComponent', () => {
    let component: CreateStoreComponent;
    let fixture: ComponentFixture<CreateStoreComponent>;
    let route: { queryParamMap: Subject<Map<string, any>> };
    let service: jasmine.SpyObj<SquarespaceService>;
    let storeService: jasmine.SpyObj<StoreService>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        route = <any>{queryParamMap: new Subject()};
        service = jasmine.createSpyObj('SquarespaceService', ['getStore']);
        storeService = jasmine.createSpyObj('StoreService', ['createStore']);
        localStorage = jasmine.createSpyObj('SflLocalStorageService', ['getItem', 'setItem', 'removeItem']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            declarations: [CreateStoreComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: route},
                {provide: SquarespaceService, useValue: service},
                {provide: StoreService, useValue: storeService},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: Router, useValue: router},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should fetch a squarespace store from API', () => {
        service.getStore.and.returnValue(EMPTY);
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));
        expect(service.getStore).toHaveBeenCalledWith('someCode', 'someState');
    });

    it('should create a SF store', () => {
        service.getStore.and.returnValue(of({
            accessToken: '6709rrr75974e807ebc987a75a6bfd897',
            refreshToken: '6709rrr75974e807ebc987a75a6bfd897',
            tokenExpiresAt: 1553532363.542,
            language: 'FR',
            storeId: 123,
            feed: 'https://domain/lib/import/some_feed_url',
            sfToken: '4679rrr75974e807ebc987a75a6bfd290',
            name: 'sfdev, 12345',
        }));
        storeService.createStore.and.returnValue(EMPTY);
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(Object.keys(storeService.createStore.calls.mostRecent().args[0])).toEqual(['owner', 'feed', 'country', 'paymentType', 'storeId']);

        expect(storeService.createStore.calls.mostRecent().args[0].owner).toEqual({
            email: 'some@email.com',
            login: 'sfdev, 12345',
            password: '1234567',
            token: '4679rrr75974e807ebc987a75a6bfd290',
            phone: undefined
        });
        expect(storeService.createStore.calls.mostRecent().args[0].feed).toEqual({
            url: 'https://domain/lib/import/some_feed_url',
            source: 'squarespace',
            mapping: {
                category: 'category',
                brand: 'brand',
                'brand-link': 'brand-link',
                reference: 'id',
                name: 'name',
                link: 'uri',
                description: 'description',
                short_description: 'short_description',
                price: 'price',
                old_price: 'old-price',
                shipping_cost: 'shipping-cost',
                shipping_time: 'shipping-time',
                quantity: 'quantity',
                ean: 'barcode',
                weight: 'weight',
                ecotax: 'ecotax',
                tva: 'vat'
            },
            settings: {xmlProductNode: 'product'}
        });
        expect(storeService.createStore.calls.mostRecent().args[0].country).toEqual('FR');
        expect(storeService.createStore.calls.mostRecent().args[0].paymentType).toEqual(PaymentType.other);
        expect(storeService.createStore.calls.mostRecent().args[0].storeId).toEqual(123);
    });

    it('should set Authorization to localStorage if the store is created successfully', () => {
        service.getStore.and.returnValue(of(<any>{}));
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', 'Bearer someToken');
    });

    it('should remove squarespace state from local storage if the store is created successfully', () => {
        service.getStore.and.returnValue(of(<any>{}));
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKey.squarespaceState);
    });

    it('should redirect to the /register/create-account path if the store is created successfully', () => {
        service.getStore.and.returnValue(of(<any>{}));
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(router.navigate).toHaveBeenCalledWith(['register', 'create-account']);
    });

    it('should redirect to the squarespace error page if the store fetching failed', () => {
        service.getStore.and.returnValue(throwError({}));
        storeService.createStore.and.returnValue(of(<any>{owner: {token: 'someToken'}}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
    });

    it('should redirect to the squarespace error page if the store creation failed', () => {
        service.getStore.and.returnValue(of(<any>{}));
        storeService.createStore.and.returnValue(throwError({}));
        component.createStore({email: 'some@email.com', password: '1234567'});
        route.queryParamMap.next(new Map().set('code', 'someCode').set('state', 'someState'));

        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
    });
});
