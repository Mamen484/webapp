import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { of } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from 'sfl-shared/services';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        TestBed.configureTestingModule({
            declarations: [SettingsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call saveChannel endpoint on saveSettings()', () => {
        channelService.modifyChannel.and.returnValue(of({}));
        component.channelSettingsGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['fr', 'uk'],
        });
        component.channelId = 23;
        component.saveSettings();
        expect(channelService.modifyChannel).toHaveBeenCalledWith(<Channel>{
            contact: 'test',
            segment: 'clothes',
            country: [{code: 'fr'}, {code: 'uk'}],
        }, 23);
    });
});
