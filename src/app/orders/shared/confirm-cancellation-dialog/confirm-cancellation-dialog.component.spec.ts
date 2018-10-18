import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCancellationDialogComponent } from './confirm-cancellation-dialog.component';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ConfirmCancellationDialogComponent', () => {
    let component: ConfirmCancellationDialogComponent;
    let fixture: ComponentFixture<ConfirmCancellationDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<CarrierDetailsDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [ConfirmCancellationDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
                {provide: MAT_DIALOG_DATA, useValue: 1},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmCancellationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close the dialog when clicks `cancel` button and return null to the parent component', () => {
        component.cancel();
        expect(matDialogRef.close).toHaveBeenCalledWith();
    });

    it('should close passing true on `accept` call', () => {
        component.accept();
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });
});
