import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../core/services/user.service';
import { LocaleIdService } from '../core/services/locale-id.service';
import { MenuContainerComponent } from '../menu/menu-container.component';
import { MatCardModule, MatInputModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { UnauthenticatedMenuComponent } from '../menu/unauthenticated-menu.component';
import { DummyRouterDirective } from '../../mocks/stubs/dummy-router.directive';
import { LegacyLinkService } from '../core/services/legacy-link.service';
import { WindowRefService } from '../core/services/window-ref.service';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    let fetchAggregatedinfoSpy: jasmine.Spy;

    beforeEach(async(() => {
        loginSpy = jasmine.createSpy('login');
        fetchAggregatedinfoSpy = jasmine.createSpy('fetchAggregatedInfo');
        navigateSpy = jasmine.createSpy('navigate');
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MenuContainerComponent,
                UnauthenticatedMenuComponent,
                DummyRouterDirective],
            providers: [
                {provide: UserService, useValue: ({login: loginSpy, fetchAggregatedInfo: fetchAggregatedinfoSpy})},
                {provide: LocaleIdService, useValue: ({localeId: 'en'})},
                {provide: Router, useValue: {navigate: navigateSpy}},
                {
                    provide: LegacyLinkService, useValue: {
                    getLegacyLink: () => {
                    }
                }
                },
                {
                    provide: WindowRefService,
                    useValue: {
                        nativeWindow: {
                            location: {href: ''},
                            localStorage: {
                                removeItem: () => {
                                }
                            }
                        }
                    }
                },

            ],
            imports: [
                MatMenuModule,
                MatToolbarModule,
                FormsModule,
                ReactiveFormsModule,
                MatCardModule,
                MatInputModule,
                NoopAnimationsModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should not call user service when the username is empty', () => {
        component.userNameControl.setValue('123');
        component.login();
        expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should not call user service when the password is empty', () => {
        component.passwordControl.setValue('123');
        component.login();
        expect(loginSpy).not.toHaveBeenCalled();
    });

    it('should call user service with correct username and password', () => {
        loginSpy.and.returnValue(Observable.of({}));
        fetchAggregatedinfoSpy.and.returnValue(Observable.of(aggregatedUserInfoMock));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(loginSpy).toHaveBeenCalledWith('123', 'asf');
    });

    it('should write the error when the UserService returns an error', () => {
        loginSpy.and.returnValue(Observable.throw({error: {detail: 'bubidu'}}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.error).toEqual('bubidu');
    });

    it('should show an error that the store is deleted, when all the stores in the userInfo have deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'deleted';
        fetchAggregatedinfoSpy.and.returnValue(Observable.of(userInfo));
        loginSpy.and.returnValue(Observable.of({}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.showDeletedStoreError).toEqual(true);
    });

    it('should NOT show an error that the store is deleted, when at least one store in the userInfo has deleted status', () => {
        let userInfo = cloneDeep(aggregatedUserInfoMock);
        userInfo._embedded.store[0].status = 'deleted';
        userInfo._embedded.store[1].status = 'deleted';
        userInfo._embedded.store[2].status = 'suspended';
        fetchAggregatedinfoSpy.and.returnValue(Observable.of(userInfo));
        loginSpy.and.returnValue(Observable.of({}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.showDeletedStoreError).toEqual(false);
    });
});