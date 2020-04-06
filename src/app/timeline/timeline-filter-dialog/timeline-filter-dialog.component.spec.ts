import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFilterDialogComponent } from './timeline-filter-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TimelineFilterDialogComponent', () => {
    let component: TimelineFilterDialogComponent;
    let fixture: ComponentFixture<TimelineFilterDialogComponent>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<TimelineFilterDialogComponent>>;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [TimelineFilterDialogComponent],
            providers: [
                {provide: MatDialogRef, useValue: dialogRef},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineFilterDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
