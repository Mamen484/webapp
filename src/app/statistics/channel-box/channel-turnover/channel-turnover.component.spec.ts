import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelTurnoverComponent } from './channel-turnover.component';

describe('ChannelTurnoverComponent', () => {
    let component: ChannelTurnoverComponent;
    let fixture: ComponentFixture<ChannelTurnoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelTurnoverComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelTurnoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
