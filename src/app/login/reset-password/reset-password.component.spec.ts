import { throwError, Observable, of, EMPTY } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('ResetPasswordComponent', () => {
    let passwordRecoveryService: jasmine.SpyObj<PasswordRecoveryService>;
    let route: { params: Observable<{ token: string }> };
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;
    beforeEach(async(() => {
        passwordRecoveryService = jasmine.createSpyObj(['resetPassword']);
        route = {params: of({token: 'token12'})};
        TestBed.configureTestingModule({
            declarations: [ResetPasswordComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: PasswordRecoveryService, useValue: passwordRecoveryService},
                {provide: ActivatedRoute, useValue: route},
            ],
            imports: [FormsModule],
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
        passwordRecoveryService.resetPassword.and.returnValue(of('true'));

        component.name = 'Nikola';
        component.password = '1234567Q';
        component.passwordCheck = '1234567Q';
        component.reset();
        expect(passwordRecoveryService.resetPassword).toHaveBeenCalledTimes(1);
    });

    it('should set passwordIncorrect to true if the password does not contain a digit', () => {
        component.password = 'QWERTYIO';
        component.reset();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should set passwordIncorrect to true if the password does not contain an uppercase letter', () => {
        component.password = '12345678';
        component.reset();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should set passwordIncorrect to true if the password length is less then 8 characters', () => {
        component.password = '123Q';
        component.reset();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should set passwordIncorrect to false if the password is `safe`', () => {
        component.password = 'zxcvbq1Q';
        component.reset();
        expect(component.passwordIncorrect).toBe(false);
    });

    it('should set passwordsMatch to false if passwords differ', () => {
        component.password = 'zxcvbq1Q';
        component.passwordCheck = '1Qzxcvbn'
        component.reset();
        expect(component.passwordsMatch).toBe(false);
    });

    it('should set passwordsMatch to true if passwords are equal', () => {
        passwordRecoveryService.resetPassword.and.returnValue(EMPTY);
        component.password = 'zxcvbq1Q';
        component.passwordCheck = 'zxcvbq1Q'
        component.reset();
        expect(component.passwordsMatch).toBe(true);
    });

    it('should NOT send a password recovery request when a password field is empty', () => {
        component.name = 'Nikola';
        component.passwordCheck = '1234567Q';
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should NOT send a password recovery request when a passwordCheck field is empty', () => {
        component.name = 'Nikola';
        component.password = '1';
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should NOT send a password recovery request when password and passwordCheck fields have different values', () => {
        component.name = 'Nikola';
        component.password = '1234567Q';
        component.passwordCheck = '1234567Z';
        component.reset();
        expect(passwordRecoveryService.resetPassword).not.toHaveBeenCalled();
    });

    it('should show a success message when a password recovery request is successful', () => {
        passwordRecoveryService.resetPassword.and.returnValue(of('true'));

        component.name = 'Nikola';
        component.password = '1234567Q';
        component.passwordCheck = '1234567Q';
        component.reset();
        expect(component.showSuccessMessage).toEqual(true);
    });
});
