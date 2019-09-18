import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNotExistComponent } from './channel-not-exist.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelNotExistComponent', () => {
    let component: ChannelNotExistComponent;
    let fixture: ComponentFixture<ChannelNotExistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelNotExistComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelNotExistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
