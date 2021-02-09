import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SfuiCheckboxModule } from 'sfui';

describe('CreateAccountComponent', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CreateAccountComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [],
            imports: [FormsModule, SfuiCheckboxModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should mark the password as valid if it is 8 characters long, has a digit and a capital letter', () => {
        component.password = '1234567Q';
        component.submit();
        expect(component.passwordIncorrect).toBe(false);
    });

    it('should mark the password as valid if it is 8 more then characters long, has a digit and a capital letter', () => {
        component.password = '1234567Qabc';
        component.submit();
        expect(component.passwordIncorrect).toBe(false);
    });

    it('should mark password as not valid if it is less then 8 characters long', () => {
        component.password = '123456Q';
        component.submit();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should mark password as not valid if it doesn`t contain a capital letter', () => {
        component.password = '12345678';
        component.submit();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should mark password as not valid if it doesn`t contain a digit', () => {
        component.password = 'QWERTYU';
        component.submit();
        expect(component.passwordIncorrect).toBe(true);
    });

    it('should set passwordNotMatch to true', () => {
        component.password = 'QWERTYU12';
        component.passwordCheck = 'QWERTYU';
        component.submit();
        expect(component.passwordsMatch).toBe(false);
    });

    it('should set passwordNotMatch to false', () => {
        component.password = 'QWERTYU12';
        component.passwordCheck = 'QWERTYU12';
        component.submit();
        expect(component.passwordsMatch).toBe(true);
    });

    it('should set emailValid to true', () => {
        component.email = 'test@test.com';
        component.submit();
        expect(component.emailValid).toBe(true);
    });

    it('should set emailValid to false', () => {
        component.email = 'test';
        component.submit();
        expect(component.emailValid).toBe(false);
    });

    it('should NOT emit submitted event if a password is not valid', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.email = 'fferqw';
        component.password = '1234567';
        component.submit();
        expect(spy).not.toHaveBeenCalled();
    });

    it('should emit submitted event when both controls are valid and the terms accepted', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.email = 'test@test.com';
        component.password = '1234567Q';
        component.passwordCheck = '1234567Q';
        component.termsAccepted = true;
        component.submit();
        expect(spy).toHaveBeenCalledWith({email: 'test@test.com', password: '1234567Q'});
    });

    it('should NOT emit submitted event when both controls are valid and the terms NOT accepted', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.email = 'test@test.com';
        component.password = '1234567Q';
        component.passwordCheck = '1234567Q';
        component.termsAccepted = false;
        component.submit();
        expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT emit submitted event when both controls are valid, the terms are accepted, but the password check is not correct', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.email = 'test@test.com';
        component.password = '1234567Q';
        component.passwordCheck = '123';
        component.termsAccepted = true;
        component.submit();
        expect(spy).not.toHaveBeenCalled();
    });

});
