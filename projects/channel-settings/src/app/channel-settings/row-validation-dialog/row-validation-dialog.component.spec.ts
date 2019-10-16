import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowValidationDialogComponent } from './row-validation-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RowValidationDialogComponent', () => {
    let component: RowValidationDialogComponent;
    let fixture: ComponentFixture<RowValidationDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RowValidationDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RowValidationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
