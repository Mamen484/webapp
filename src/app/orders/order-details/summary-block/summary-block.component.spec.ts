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
        component.order = <any>{};
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize an additionalFields array', () => {
        component.order.additionalFields = {
            empty_field: '',
            field_1: '1',
            field_2: '2'
        };
        component.ngOnInit();
        expect(component.additionalFields.length).toBe(2);
        expect(component.additionalFields).toEqual([
            ['field_1', '1'],
            ['field_2', '2'],
        ]);
    });
});
