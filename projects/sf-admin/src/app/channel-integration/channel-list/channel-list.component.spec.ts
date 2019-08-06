import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelListComponent } from './channel-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelListComponent', () => {
    let component: ChannelListComponent;
    let fixture: ComponentFixture<ChannelListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChannelListComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
