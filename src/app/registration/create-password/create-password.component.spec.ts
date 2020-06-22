import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordComponent } from './create-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SflAuthService, SflLocaleIdService, StoreService } from 'sfl-shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { BlankComponent } from '../../shared/blank.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';

describe('CreatePasswordComponent', () => {
    let component: CreatePasswordComponent;
    let fixture: ComponentFixture<CreatePasswordComponent>;
    let queryParams, shopifyService;
    let storeService: jasmine.SpyObj<StoreService>;
    let authService: jasmine.SpyObj<SflAuthService>;


    describe('ngOnInit', () => {
        beforeEach(() => {
            createForLocale('en');
        });

        it('should be created', () => {
            expect(component).toBeTruthy();
        });

        it('should call data from server ', () => {
            shopifyService.getStoreData.and.returnValue(of({}));
            component.ngOnInit();
            expect(shopifyService.getStoreData).toHaveBeenCalled();
        });

        it('should send email and password to the server createPassword() called', () => {
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(storeService.createStore).toHaveBeenCalledWith(<any>{
                owner: {
                    email: 'test@test.com',
                    password: '1234567',
                },
            });
        });

        it('should use the data from the server', () => {
            shopifyService.getStoreData.and.returnValue(of({owner: {some_data: 'some data from server'}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect((<any>storeService.createStore.calls.mostRecent().args[0].owner).some_data)
                .toEqual('some data from server');
        });

        it('should redirect to account creation progress dialog if createPassword request is successful', () => {
            let router = TestBed.inject(Router);
            spyOn(router, 'navigate');
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(of(<any>{owner: {}}));
            fixture.detectChanges();
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(router.navigate).toHaveBeenCalledWith(['register', 'create-account'])
        });

        it('should display an error if the createPassword request returns an error', () => {
            let router = TestBed.inject(Router);
            spyOn(router, 'navigate');
            shopifyService.getStoreData.and.returnValue(of({owner: {}}));
            storeService.createStore.and.returnValue(throwError('some error'));
            fixture.detectChanges();
            expect(component.displayServerError).toEqual(false);
            component.createPassword({email: 'test@test.com', password: '1234567'});
            expect(component.displayServerError).toEqual(true);
        })
    });

    describe('localization', () => {
        it('should assign an appropriate support email when the french locale is used', () => {
            createForLocale('fr');
            expect(component.supportEmail).toBe(environment.supportEmail.fr);
        });

        it('should assign an appropriate support email when the portuguese locale is used', () => {
            createForLocale('pt');
            expect(component.supportEmail).toBe(environment.supportEmail.pt);
        });

        it('should assign an appropriate support email when the german locale is used', () => {
            createForLocale('de');
            expect(component.supportEmail).toBe(environment.supportEmail.de);
        });

        it('should assign an appropriate support email when the english locale is used', () => {
            createForLocale('en');
            expect(component.supportEmail).toBe(environment.supportEmail.en);
        });

        it('should assign an appropriate support email when the italian locale is used', () => {
            createForLocale('it');
            expect(component.supportEmail).toBe(environment.supportEmail.it);
        });

        it('should assign an appropriate support email when the spanish locale is used', () => {
            createForLocale('es');
            expect(component.supportEmail).toBe(environment.supportEmail.es);
        });
    });

    function createForLocale(locale) {
        queryParams = of({});
        shopifyService = jasmine.createSpyObj('ShopifyAuthentifyService', ['getStoreData']);
        storeService = jasmine.createSpyObj('StoreService', ['createStore']);
        authService = jasmine.createSpyObj(['loginByToken']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{path: 'register/create-account', component: BlankComponent}]),
                FormsModule,
                ReactiveFormsModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ShopifyAuthentifyService, useValue: shopifyService},
                {provide: StoreService, useValue: storeService},
                {provide: SflLocaleIdService, useValue: {localeId: locale}},
                {provide: ActivatedRoute, useValue: {queryParams: of({})}},
                {
                    provide: LegacyLinkService, useValue: {
                        getLegacyLink: () => {
                        }
                    }
                },
                {provide: SflAuthService, useValue: authService},
            ],
            declarations: [CreatePasswordComponent, BlankComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreatePasswordComponent);
        component = fixture.componentInstance;
    }

});
