import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsDialogComponent } from './credentials-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('CredentialsDialogComponent', () => {
    let component: CredentialsDialogComponent;
    let fixture: ComponentFixture<CredentialsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CredentialsDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: MAT_DIALOG_DATA, useValue: {}}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CredentialsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
