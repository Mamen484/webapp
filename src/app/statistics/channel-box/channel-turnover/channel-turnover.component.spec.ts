import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelTurnoverComponent } from './channel-turnover.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelTurnoverComponent', () => {
    let component: ChannelTurnoverComponent;
    let fixture: ComponentFixture<ChannelTurnoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelTurnoverComponent],
            schemas: [NO_ERRORS_SCHEMA],
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
