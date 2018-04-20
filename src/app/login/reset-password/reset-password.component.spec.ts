import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

describe('ResetPasswordComponent', () => {
    let passwordRecoveryService: jasmine.SpyObj<PasswordRecoveryService>;
    let route: { params: Observable<{ token: string }> };
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;
    beforeEach(async(() => {
        passwordRecoveryService = jasmine.createSpyObj(['resetPassword']);
        route = {params: Observable.of({token: 'token12'})};
        TestBed.configureTestingModule({
            declarations: [ResetPasswordComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: PasswordRecoveryService, useValue: passwordRecoveryService},
                {provide: ActivatedRoute, useValue: route},
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should send a password recovery request when all fields are valid', () => {
        passwordRecoveryService.resetPassword.and.returnValue(Observable.of(true));

        component.nameControl.setValue('Nikola');
        component.passwordControl.setValue('1');
        component.passwordCheckControl.setValue('1');
        component.reset();
        expect(passwordRecoveryService.resetPassword).toHaveBeenCalledTimes(1);
    });

    it('should NOT send a password recovery request when a name field is empty', () => {
        component.passwordControl.setValue('1');
        component.passwordCheckControl.setValue('1');
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should NOT send a password recovery request when a password field is empty', () => {
        component.nameControl.setValue('Nikola');
        component.passwordCheckControl.setValue('1');
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should NOT send a password recovery request when a passwordCheck field is empty', () => {
        component.nameControl.setValue('Nikola');
        component.passwordControl.setValue('1');
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should NOT send a password recovery request when password and passwordCheck fields have different values', () => {
        component.nameControl.setValue('Nikola');
        component.passwordControl.setValue('1');
        component.passwordCheckControl.setValue('2');
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should show a success message when a password recovery request is successful', () => {
        passwordRecoveryService.resetPassword.and.returnValue(Observable.of(true));

        component.nameControl.setValue('Nikola');
        component.passwordControl.setValue('1');
        component.passwordCheckControl.setValue('1');
        component.reset();
        expect(component.showSuccessMessage).toEqual(true);
    });

    it('should show an error message when a password recovery request  fails', () => {
        passwordRecoveryService.resetPassword.and.returnValue(Observable.throw(''));

        component.nameControl.setValue('Nikola');
        component.passwordControl.setValue('1');
        component.passwordCheckControl.setValue('1');
        component.reset();
        expect(component.showError).toEqual(true);
    });

    it('should reset a showError field to false on each reset() call', () => {
        component.showError = true;
        expect(component.showError).toEqual(true);
        component.reset();
        expect(component.showError).toEqual(false);
    });
});
