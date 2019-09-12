import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingsComponent } from './channel-settings.component';
import { ChannelService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { Channel } from 'sfl-shared/entities';
import { Field } from './field';

describe('ChannelSettingsComponent', () => {
    let component: ChannelSettingsComponent;
    let fixture: ComponentFixture<ChannelSettingsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let routeData: Subject<{ channel: Channel, fields?: Field[] }>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        routeData = new Subject();

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ChannelSettingsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: ActivatedRoute, useValue: {data: routeData}},
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

    it('should assign a channelId and channel from routeData', () => {
        routeData.next({channel: {id: 100, contact: <any>{}}});
        expect(component.channel).toEqual({id: 100, contact: <any>{}});
        expect(component.channelId).toEqual(100);
    });

    it('should call saveChannel endpoint on save()', () => {
        channelService.modifyChannel.and.returnValue(of({}));
        component.addField();
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['fr', 'uk'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        });
        component.channel = {id: 23};
        component.save();
        expect(channelService.modifyChannel).toHaveBeenCalledWith(<Channel>{
            contact: 'test',
            segment: 'clothes',
            country: [{code: 'fr'}, {code: 'uk'}],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        }, 23);
    });

    it('should remove a template row by specified index', () => {
        component.addField();
        component.addField();
        component.addField();
        component.templateControl.setValue([
            {channelField: 'someChannelField1', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField2', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField3', appField: 'someSfField', defaultValue: ''},
        ]);
        component.removeField(1);
        expect(component.templateControls.length).toBe(2);
        expect(component.templateControls[0].controls.channelField.value).toBe('someChannelField1');
        expect(component.templateControls[1].controls.channelField.value).toBe('someChannelField3');
    });

    it('should add as many fields as template has rows', () => {
        routeData.next({
            channel: {
                id: 22, contact: {email: 'some email'}, countries: [], segment: 'some segment', template: [
                    {channelField: 'someChannelField1', appField: 'someSfField', defaultValue: ''},
                    {channelField: 'someChannelField2', appField: 'someSfField', defaultValue: ''},
                    {channelField: 'someChannelField3', appField: 'someSfField', defaultValue: ''},
                ]
            }
        });
        expect(component.templateControl.length).toBe(3);
    });

    it('should add an empty row if template has no rows', () => {
        routeData.next({
            channel: {
                id: 22, contact: {email: 'some email'}, countries: [], segment: 'some segment'
            }
        });
        expect(component.templateControl.length).toBe(1);
    });

    it('should assign templateFields', () => {
        routeData.next({fields: [<any>{someProp: 'someValue'}], channel: {id: 100, contact: <any>{}}});
        expect(component.templateFields).toEqual([<any>{someProp: 'someValue'}]);
    });
});
