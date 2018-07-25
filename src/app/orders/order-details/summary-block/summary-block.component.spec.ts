import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryBlockComponent } from './summary-block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SummaryBlockComponent', () => {
    let component: SummaryBlockComponent;
    let fixture: ComponentFixture<SummaryBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SummaryBlockComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SummaryBlockComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
