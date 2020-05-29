import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountComponent } from './create-account.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('CreateAccountComponent', () => {
    let component: CreateAccountComponent;
    let fixture: ComponentFixture<CreateAccountComponent>;
    let snackbar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {
        snackbar = jasmine.createSpyObj(['openFromComponent']);
        TestBed.configureTestingModule({
            declarations: [CreateAccountComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatSnackBar, useValue: snackbar},
            ]
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

    it('should NOT emit submitted event if email or password are invalid', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.emailControl.setValue('tadada');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.passwordControl.setValue('1');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.passwordControl.setValue('123456');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.emailControl.setValue('test@test.com');
        component.passwordControl.setValue('123456');
        component.submit();
        expect(spy).not.toHaveBeenCalled();

        component.emailControl.setValue('fferqw');
        component.passwordControl.setValue('1234567');
        component.submit();
        expect(spy).not.toHaveBeenCalled();
    });

    it('should emit submitted event when both controls are valid and the terms accepted', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.emailControl.setValue('test@test.com');
        component.passwordControl.setValue('1234567');
        component.termsAccepted = true;
        component.submit();
        expect(spy).toHaveBeenCalledWith({email: 'test@test.com', password: '1234567'});
    });

    it('should NOT emit submitted event when both controls are valid and the terms NOT accepted', () => {
        const spy = spyOn(component.submitted, 'emit');
        component.emailControl.setValue('test@test.com');
        component.passwordControl.setValue('1234567');
        component.termsAccepted = false;
        component.submit();
        expect(spy).not.toHaveBeenCalled();
    });

});
