import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelOnlineComponent } from './channel-online.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelOnlineComponent', () => {
    let component: ChannelOnlineComponent;
    let fixture: ComponentFixture<ChannelOnlineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelOnlineComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelOnlineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
