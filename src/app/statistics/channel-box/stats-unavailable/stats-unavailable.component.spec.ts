import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUnavailableComponent } from './stats-unavailable.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('StatsUnavailableComponent', () => {
    let component: StatsUnavailableComponent;
    let fixture: ComponentFixture<StatsUnavailableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatsUnavailableComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsUnavailableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
