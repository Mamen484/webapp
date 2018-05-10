import {throwError, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendRecoveryEmailComponent } from './send-recovery-email.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';

describe('SendRecoveryEmailComponent', () => {
    let passwordRecoveryService: jasmine.SpyObj<PasswordRecoveryService>;

    let component: SendRecoveryEmailComponent;
    let fixture: ComponentFixture<SendRecoveryEmailComponent>;
    beforeEach(async(() => {
        passwordRecoveryService = jasmine.createSpyObj(['sendRecoveryEmail']);
        TestBed.configureTestingModule({
            declarations: [SendRecoveryEmailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: PasswordRecoveryService, useValue: passwordRecoveryService},
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SendRecoveryEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should send a recovery email request when a username field is not empty', () => {
        passwordRecoveryService.sendRecoveryEmail.and.returnValue(of('anything'))

        component.emailControl.setValue('1');
        component.reset();
        expect(passwordRecoveryService.sendRecoveryEmail).toHaveBeenCalledTimes(1);
    });

    it('should NOT send a recovery email request when a username field is empty', () => {
        component.emailControl.setValue('');
        component.reset();
        expect(passwordRecoveryService.sendRecoveryEmail).not.toHaveBeenCalled();
    });

    it('should show a success message when a password recovery request is successful', () => {
        passwordRecoveryService.sendRecoveryEmail.and.returnValue(of(true));
        component.emailControl.setValue('1');
        component.reset();
        expect(component.showSuccessMessage).toEqual(true);
    });

    it('should show an error message when a password recovery request  fails', () => {
        passwordRecoveryService.sendRecoveryEmail.and.returnValue(throwError(''));
        component.emailControl.setValue('1');
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
