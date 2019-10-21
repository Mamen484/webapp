import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SflLocaleIdService, SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { BlankComponent } from '../../shared/blank.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CreatePasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;
    let queryParams, localStorage, shopifyService;
    let storeService: jasmine.SpyObj<StoreService>;

    beforeEach(async(() => {
        localStorage = jasmine.createSpyObj('LocalStorage', ['getItem', 'setItem', 'removeItem']);
        queryParams = of({});
        shopifyService = jasmine.createSpyObj('ShopifyAuthentifyService', ['getStoreData']);
        storeService = jasmine.createSpyObj('StoreService', ['createStore']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{path: 'register/create-account', component: BlankComponent}]),
                FormsModule,
                ReactiveFormsModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ShopifyAuthentifyService, useValue: shopifyService},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: StoreService, useValue: storeService},
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: ActivatedRoute, useValue: {queryParams: of({})}},
                {
                    provide: LegacyLinkService, useValue: {
                        getLegacyLink: () => {
                        }
                    }
                },
            ],
            declarations: [CreatePasswordComponent, BlankComponent]
        })
            .compileComponents();
    }));

    describe('ngOnInit', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(CreatePasswordComponent);
            component = fixture.componentInstance;

        });

        it('should be created', () => {
            expect(component).toBeTruthy();
        });

        it('should NOT call data from server when the store data is cached in the local storage', () => {
            localStorage.getItem.and.returnValue('{"key":"anything"}');
            component.ngOnInit();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(shopifyService.getStoreData).not.toHaveBeenCalled();
        });

        it('should call data from server when the store data is NOT cached in the local storage', () => {
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({}));
            component.ngOnInit();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(shopifyService.getStoreData).toHaveBeenCalled();
        });

        it('should send email and password to the server createPassword() called', () => {
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(storeService.createStore).toHaveBeenCalledWith({
                owner: {
                    email: 'test@test.com',
                    password: '1234567',
                },
            });
        });

        it('should use cached data if it is in the local storage', () => {
            localStorage.getItem.and.returnValue('{"owner": {"some_data":"some data"}}');
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect((<any>storeService.createStore.calls.mostRecent().args[0].owner).some_data)
                .toEqual('some data')
        });

        it('should use the data from the server if there is no cache in the local storage', () => {
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {some_data: 'some data from server'}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect((<any>storeService.createStore.calls.mostRecent().args[0].owner).some_data)
                .toEqual('some data from server');
        });

        it('should save the authorization to the local storage if a call to the server was successful', () => {
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {token: 'some token'}}));

            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', 'Bearer some token');
        });

        it('should redirect to account creation progress dialog if createPassword request is successful', () => {
            let router = TestBed.get(Router);
            spyOn(router, 'navigate');
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(router.navigate).toHaveBeenCalledWith(['register', 'create-account'])
        });

        it('should display an error if the createPassword request returns an error', () => {
            let router = TestBed.get(Router);
            spyOn(router, 'navigate');
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(throwError('some error'));
            fixture.detectChanges();
            expect(component.displayServerError).toEqual(false);
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(component.displayServerError).toEqual(true);
        })

    })

});
