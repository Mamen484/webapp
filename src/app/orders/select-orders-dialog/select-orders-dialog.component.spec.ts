import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrdersDialogComponent } from './select-orders-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectOrdersDialogComponent', () => {
    let component: SelectOrdersDialogComponent;
    let fixture: ComponentFixture<SelectOrdersDialogComponent>;
    let dialogRef: MatDialogRef<SelectOrdersDialogComponent>;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [SelectOrdersDialogComponent],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: OrderNotifyAction.ship},
                {provide: MatDialogRef, useValue: dialogRef},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectOrdersDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(fixture.debugElement.nativeElement.querySelector('mat-dialog-content').textContent.trim())
            .toEqual('Please, select orders to ship');
    });

    it('should close the dialog on click on `ok` button', () => {
        component.close();
        expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });
});
