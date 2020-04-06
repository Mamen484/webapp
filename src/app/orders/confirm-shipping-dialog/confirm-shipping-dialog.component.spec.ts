import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmShippingDialogComponent } from './confirm-shipping-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmShippingDialogComponent', () => {
    let component: ConfirmShippingDialogComponent;
    let fixture: ComponentFixture<ConfirmShippingDialogComponent>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmShippingDialogComponent>>;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [ConfirmShippingDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: dialogRef},
                {provide: MAT_DIALOG_DATA, useValue: {ordersNumber: 1, orderReference: 'AAA'}},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmShippingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('should close passing false on `cancel` call', () => {
        component.cancel();
        expect(dialogRef.close).toHaveBeenCalledWith(false);
    });

    it ('should close passing true on `accept` call', () => {
        component.accept();
        expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
});
