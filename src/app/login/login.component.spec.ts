import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { UserService } from '../core/services/user.service';
import { LocaleIdService } from '../core/services/locale-id.service';
import { MenuContainerComponent } from '../menu/menu-container.component';
import { MdCardModule, MdInputModule, MdMenuModule, MdToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { UnauthenticatedMenuComponent } from '../menu/unauthenticated-menu.component';
import { DummyRouterDirective } from '../../mocks/stubs/dummy-router.directive';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;

    beforeEach(async(() => {
        loginSpy = jasmine.createSpy('login');
        navigateSpy = jasmine.createSpy('navigate');
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MenuContainerComponent,
                UnauthenticatedMenuComponent,
                DummyRouterDirective],
            providers: [
                {provide: UserService, useValue: ({login: loginSpy})},
                {provide: LocaleIdService, useValue: ({localeId: 'en'})},
                {provide: Router, useValue: {navigate: navigateSpy}}

            ],
            imports: [
                MdMenuModule,
                MdToolbarModule,
                FormsModule,
                ReactiveFormsModule,
                MdCardModule,
                MdInputModule,
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
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(loginSpy).toHaveBeenCalledWith('123', 'asf');
    });

    it('should call navigate to the homepage when the UserService returns success', () => {
        loginSpy.and.returnValue(Observable.of({}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(navigateSpy).toHaveBeenCalledWith(['']);
    });

    it('should write the error when the UserService returns an error', () => {
        loginSpy.and.returnValue(Observable.throw({detail: 'bubidu'}));
        component.userNameControl.setValue('123');
        component.passwordControl.setValue('asf');
        component.login();
        expect(component.error).toEqual('bubidu');
    });
});
