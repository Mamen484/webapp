import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SflAuthService, SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../environments/environment';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let userService: jasmine.SpyObj<SflUserService>;
    let authService: jasmine.SpyObj<SflAuthService>;
    let localeIdService: SflLocaleIdService;

    describe('', () => {
        beforeEach(() => {
            createForLocale('en');
        });
        it('should be created', () => {
            expect(component).toBeTruthy();
        });

        it('should call user service login() call', () => {
            authService.login.and.returnValue(of({}));
            userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
            component.login({username: '123', password: 'asf'});
            expect(authService.login).toHaveBeenCalledWith('123', 'asf');
        });

        it('should write the error when the SflUserService returns an error', () => {
            authService.login.and.returnValue(throwError({error: {detail: 'bubidu'}}));
            component.login({username: '123', password: '456'});
            expect(component.error).toEqual('bubidu');
        });

        it('should show an error that the store is deleted, when all the stores in the userInfo have deleted status', () => {
            let userInfo = cloneDeep(aggregatedUserInfoMock);
            userInfo._embedded.store[0].status = 'deleted';
            userInfo._embedded.store[1].status = 'deleted';
            userInfo._embedded.store[2].status = 'deleted';
            userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
            authService.login.and.returnValue(of({}));
            component.login({username: '123', password: '456'});
            expect(component.showDeletedStoreError).toEqual(true);
        });

        it('should NOT show an error that the store is deleted, when at least one store in the userInfo has deleted status', () => {
            let userInfo = cloneDeep(aggregatedUserInfoMock);
            userInfo._embedded.store[0].status = 'deleted';
            userInfo._embedded.store[1].status = 'deleted';
            userInfo._embedded.store[2].status = 'suspended';
            userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
            authService.login.and.returnValue(of({}));
            component.login({username: '123', password: '456'});
            expect(component.showDeletedStoreError).toEqual(false);
        });

        it('should redirect to /admin when a user has an admin role', () => {
            let userInfo = cloneDeep(aggregatedUserInfoMock);
            userInfo.roles = ['admin'];
            userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create(userInfo)));
            authService.login.and.returnValue(of({access_token: 'some_token'}));
            component.login({username: '123', password: '456'});
            expect(fixture.debugElement.injector.get(SflWindowRefService).nativeWindow.location.href)
                .toContain(`/admin?token=some_token&store=307`);
        });
    });

    describe('localization', () => {

        it('should assign an appropriate contact email when the french locale is used', () => {
            createForLocale('fr');
            expect(component.contactEmail).toBe(environment.contactEmail.fr);
        });

        it('should assign an appropriate contact email when the portuguese locale is used', () => {
            createForLocale('pt');
            expect(component.contactEmail).toBe(environment.contactEmail.pt);
        });

        it('should assign an appropriate contact email when the german locale is used', () => {
            createForLocale('de');
            expect(component.contactEmail).toBe(environment.contactEmail.de);
        });

        it('should assign an appropriate contact email when the english locale is used', () => {
            createForLocale('en');
            expect(component.contactEmail).toBe(environment.contactEmail.en);
        });

        it('should assign an appropriate contact email when the italian locale is used', () => {
            createForLocale('it');
            expect(component.contactEmail).toBe(environment.contactEmail.it);
        });

        it('should assign an appropriate contact email when the spanish locale is used', () => {
            createForLocale('es');
            expect(component.contactEmail).toBe(environment.contactEmail.es);
        });
    });


    function createForLocale(locale) {
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        authService = jasmine.createSpyObj('SflAuthService', ['login', 'logout']);

        localeIdService = <any>{localeId: locale};
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                {provide: SflUserService, useValue: userService},
                {provide: SflAuthService, useValue: authService},
                {
                    provide: SflWindowRefService,
                    useValue: {
                        nativeWindow: {
                            location: {href: ''},
                        }
                    }
                },
                {provide: SflLocaleIdService, useValue: localeIdService},

            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }
});

