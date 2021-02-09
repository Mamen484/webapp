import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingToolsComponent } from './tracking-tools.component';

describe('TrackingToolsComponent', () => {
    let component: TrackingToolsComponent;
    let fixture: ComponentFixture<TrackingToolsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TrackingToolsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TrackingToolsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
