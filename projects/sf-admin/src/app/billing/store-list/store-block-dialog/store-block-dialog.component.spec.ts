import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBlockDialogComponent } from './store-block-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';

describe('StoreBlockDialogComponent', () => {
    let component: StoreBlockDialogComponent;
    let fixture: ComponentFixture<StoreBlockDialogComponent>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<StoreBlockDialogComponent>>;

    beforeEach(async(() => {

        matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            declarations: [StoreBlockDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialogRef, useValue: matDialogRef},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreBlockDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close dialog passing true in it on block() call', () => {
        component.block();
        expect(matDialogRef.close).toHaveBeenCalledWith(true);
    });
});
