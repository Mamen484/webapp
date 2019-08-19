import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingsComponent } from './channel-settings.component';
import { ChannelService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChannelSettingsComponent', () => {
    let component: ChannelSettingsComponent;
    let fixture: ComponentFixture<ChannelSettingsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ChannelSettingsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
