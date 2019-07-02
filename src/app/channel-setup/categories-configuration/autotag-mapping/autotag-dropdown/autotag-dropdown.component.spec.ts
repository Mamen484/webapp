import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotagDropdownComponent } from './autotag-dropdown.component';
import { ChannelService } from '../../../../core/services/channel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AutotagDropdownComponent', () => {
    let component: AutotagDropdownComponent;
    let fixture: ComponentFixture<AutotagDropdownComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['fetchChannelConstraintCollection']);
        TestBed.configureTestingModule({
            declarations: [AutotagDropdownComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutotagDropdownComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize options on init', () => {
        component.autotag = <any>{_embedded: {attribute: {}}};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        expect(component.options).toEqual(['label1', 'label2']);
    });
});
