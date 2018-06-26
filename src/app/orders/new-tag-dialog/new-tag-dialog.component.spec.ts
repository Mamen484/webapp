import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTagDialogComponent } from './new-tag-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';

describe('NewTagDialogComponent', () => {
    let component: NewTagDialogComponent;
    let fixture: ComponentFixture<NewTagDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<NewTagDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [NewTagDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewTagDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog passing a tagName into it', () => {
        component.tagName = 'some tag name';
        component.save();
        expect(matDialogRef.close).toHaveBeenCalledWith('some tag name');
    });
});
