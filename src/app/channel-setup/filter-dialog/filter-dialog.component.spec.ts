import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDialogComponent } from './filter-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatAutocompleteModule, MatDialogRef, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterDialogComponent', () => {
    let component: FilterDialogComponent;
    let fixture: ComponentFixture<FilterDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<FilterDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            declarations: [FilterDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule, MatAutocompleteModule, MatSelectModule, NoopAnimationsModule],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef, useValue: matDialogRef},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
