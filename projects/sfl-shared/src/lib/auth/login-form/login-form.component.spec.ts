import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SflLoginFormComponent } from './login-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginFormComponent', () => {
    let component: SflLoginFormComponent;
    let fixture: ComponentFixture<SflLoginFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SflLoginFormComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SflLoginFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not emit loginSubmitted when the username is empty', () => {
        spyOn(component.loginSubmitted, 'emit');
        component.userNameControl.setValue('123');
        component.login();
        expect(component.loginSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should not emit loginSubmitted when the password is empty', () => {
        spyOn(component.loginSubmitted, 'emit');
        component.passwordControl.setValue('123');
        component.login();
        expect(component.loginSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should emit loginSubmitted when the password and username are not empty', () => {
        spyOn(component.loginSubmitted, 'emit');
        component.passwordControl.setValue('123');
        component.userNameControl.setValue('123');
        component.login();
        expect(component.loginSubmitted.emit).toHaveBeenCalled();
    });

});
