import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuModificationDialogComponent } from './sku-modification-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectOrdersDialogComponent } from '../../select-orders-dialog/select-orders-dialog.component';

describe('SkuModificationDialogComponent', () => {
    let component: SkuModificationDialogComponent;
    let fixture: ComponentFixture<SkuModificationDialogComponent>;
    let matDialogRef: MatDialogRef<SelectOrdersDialogComponent>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj(['close']);

        TestBed.configureTestingModule({
            declarations: [SkuModificationDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {sku: 'sku1'}},
                {provide: MatDialogRef, useValue: matDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkuModificationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign sku on init', () => {
        expect(component.sku).toBe('sku1');
    });

    it('should close a dialog, passing sku outside on save', () => {
        component.save();
        expect(matDialogRef.close).toHaveBeenCalledWith('sku1');
    });
});
