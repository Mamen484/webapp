import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRowDialogComponent } from './delete-row-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

describe('DeleteRowDialogComponent', () => {
    let component: DeleteRowDialogComponent;
    let fixture: ComponentFixture<DeleteRowDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<DeleteRowDialogComponent>>;

    beforeEach(async(() => {
        matDialogRef = jasmine.createSpyObj('MatDialogRef spy', ['close']);
        TestBed.configureTestingModule({
            declarations: [DeleteRowDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteRowDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should pass true to confirm removal', () => {
        component.confirm();
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });
});
