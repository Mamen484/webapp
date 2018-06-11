import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UserCreatedDialogComponent } from './user-created-dialog.component';

describe('UserCreatedDialogComponent', () => {
    let component: UserCreatedDialogComponent;
    let fixture: ComponentFixture<UserCreatedDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserCreatedDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCreatedDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should set loginCopied to true and after 3 seconds change it back to false when login is copied', fakeAsync(() => {
        component.markAsCopied('login');
        expect(component.loginCopied).toEqual(true);
        tick(3000);
        expect(component.loginCopied).toEqual(false);
    }));

    it('should set passwordCopied to true and after 3 seconds change it back to false when password is copied', fakeAsync(() => {
        component.markAsCopied('password');
        expect(component.passwordCopied).toEqual(true);
        tick(3000);
        expect(component.passwordCopied).toEqual(false);
    }));

    it('should set tokenCopied to true and after 3 seconds change it back to false when token is copied', fakeAsync(() => {
        component.markAsCopied('token');
        expect(component.tokenCopied).toEqual(true);
        tick(3000);
        expect(component.tokenCopied).toEqual(false);
    }));
});
