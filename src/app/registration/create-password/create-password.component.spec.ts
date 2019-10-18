import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SflLocaleIdService, StoreService } from 'sfl-shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { SflLocalStorageService } from 'sfl-shared/services';
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

        it('should NOT call password service if email or password are invalid', () => {
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));

            fixture.detectChanges();
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();

            component.emailControl.setValue('tadada');
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();

            component.passwordControl.setValue('1');
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();

            component.passwordControl.setValue('123456');
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();

            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('123456');
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();

            component.emailControl.setValue('fferqw');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect(storeService.createStore).not.toHaveBeenCalled();
        });

        it('should send email and password to the server when both controls are valid', () => {
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect(storeService.createStore).toHaveBeenCalled();
        });

        it('should use cached data if it is in the local storage', () => {
            localStorage.getItem.and.returnValue('{"owner": {"some_data":"some data"}}');
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect((<any>storeService.createStore.calls.mostRecent().args[0].owner).some_data)
                .toEqual('some data')
        });

        it('should use the data from the server if there is no cache in the local storage', () => {
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {some_data: 'some data from server'}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect((<any>storeService.createStore.calls.mostRecent().args[0].owner).some_data)
                .toEqual('some data from server');
        });

        it('should save the authorization to the local storage if a call to the server was successful', () => {
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {token: 'some token'}}));

            fixture.detectChanges();
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', 'Bearer some token');
        });

        it('should redirect to account creation progress dialog if createPassword request is successful', () => {
            let router = TestBed.get(Router);
            spyOn(router, 'navigate');
            localStorage.getItem.and.returnValue(null);
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
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
            component.emailControl.setValue('test@test.com');
            component.passwordControl.setValue('1234567');
            component.createPassword();
            expect(component.displayServerError).toEqual(true);
        })

    })

});
