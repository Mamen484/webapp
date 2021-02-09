import { of } from 'rxjs';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SendRecoveryEmailComponent } from './send-recovery-email.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';

describe('SendRecoveryEmailComponent', () => {
    let passwordRecoveryService: jasmine.SpyObj<PasswordRecoveryService>;

    let component: SendRecoveryEmailComponent;
    let fixture: ComponentFixture<SendRecoveryEmailComponent>;
    beforeEach(waitForAsync(() => {
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

    it('should show a success message when a password recovery request is successful', () => {
        passwordRecoveryService.sendRecoveryEmail.and.returnValue(of(true));
        component.emailControl.setValue('1');
        component.reset();
        expect(component.showSuccessMessage).toEqual(true);
    });

});
