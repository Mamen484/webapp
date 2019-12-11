import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsavedDataDialogComponent } from './unsaved-data-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';

describe('UnsavedDataDialogComponent', () => {
    let component: UnsavedDataDialogComponent;
    let fixture: ComponentFixture<UnsavedDataDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<UnsavedDataDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            declarations: [UnsavedDataDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnsavedDataDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
