import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierDetailsDialogComponent } from './carrier-details-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CarrierInfo } from '../../core/entities/carrier-info';

describe('CarrierDetailsDialogComponent', () => {
    let component: CarrierDetailsDialogComponent;
    let fixture: ComponentFixture<CarrierDetailsDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<CarrierDetailsDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [CarrierDetailsDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarrierDetailsDialogComponent);
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
        expect(matDialogRef.close.calls.mostRecent().args[0] instanceof CarrierInfo).toEqual(true);
    });
});
