import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersDialogComponent } from './filters-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Filter } from './filter';

describe('FiltersDialogComponent', () => {
    let component: FiltersDialogComponent;
    let fixture: ComponentFixture<FiltersDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<FiltersDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            declarations: [FiltersDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
                {provide: MAT_DIALOG_DATA, useValue: new Filter()},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FiltersDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close the dialog, passing the filter data on accept()', () => {
        component.accept();
        expect(matDialogRef.close).toHaveBeenCalledWith(new Filter());
    });
});
