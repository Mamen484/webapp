import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { of } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { ChannelService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CountryAutocompleteStubComponent } from '../../../../../../src/app/orders/order-details/address-form/address-form.component.spec';

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        TestBed.configureTestingModule({
            declarations: [SettingsComponent, CountryAutocompleteStubComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatSelectModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ]
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
