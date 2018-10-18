import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelBoxComponent } from './channel-box.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelBoxComponent', () => {
    let component: ChannelBoxComponent;
    let fixture: ComponentFixture<ChannelBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelBoxComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
