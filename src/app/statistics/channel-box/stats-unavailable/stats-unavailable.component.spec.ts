import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsUnavailableComponent } from './stats-unavailable.component';

describe('StatsUnavailableComponent', () => {
    let component: StatsUnavailableComponent;
    let fixture: ComponentFixture<StatsUnavailableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatsUnavailableComponent]
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
