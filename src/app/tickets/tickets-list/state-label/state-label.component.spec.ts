import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateLabelComponent } from './state-label.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StateLabelComponent', () => {
    let component: StateLabelComponent;
    let fixture: ComponentFixture<StateLabelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StateLabelComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StateLabelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
