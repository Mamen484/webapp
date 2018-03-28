import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFilteringAreaComponent } from './timeline-filtering-area.component';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TimelineFilteringAreaComponent', () => {
    let component: TimelineFilteringAreaComponent;
    let fixture: ComponentFixture<TimelineFilteringAreaComponent>;
    let dialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async(() => {
        dialog = jasmine.createSpyObj(['open']);
        TestBed.configureTestingModule({
            declarations: [TimelineFilteringAreaComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: dialog}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimelineFilteringAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
