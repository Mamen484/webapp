import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should set loginCopied to true and after 3 seconds change it back to false when login is copied', () => {
        component.markAsCopied('login');
        expect(component.loginCopied).toEqual(true);
        jasmine.clock().tick(3000);
        expect(component.loginCopied).toEqual(false);
    });

    it('should set passwordCopied to true and after 3 seconds change it back to false when password is copied', () => {
        component.markAsCopied('password');
        expect(component.passwordCopied).toEqual(true);
        jasmine.clock().tick(3000);
        expect(component.passwordCopied).toEqual(false);
    });

    it('should set tokenCopied to true and after 3 seconds change it back to false when token is copied', () => {
        component.markAsCopied('token');
        expect(component.tokenCopied).toEqual(true);
        jasmine.clock().tick(3000);
        expect(component.tokenCopied).toEqual(false);
    });
});
