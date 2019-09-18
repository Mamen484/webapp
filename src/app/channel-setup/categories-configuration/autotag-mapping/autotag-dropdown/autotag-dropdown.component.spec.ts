import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AutotagDropdownComponent } from './autotag-dropdown.component';
import { ChannelService } from '../../../../core/services/channel.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material';

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
            imports: [MatAutocompleteModule],
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

    it('should load options when user types text', fakeAsync(() => {
        component.attribute = <any>{};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        component.control.setValue('');
        tick(300);
        expect(component.options).toEqual(['label1', 'label2']);
    }));

    it('should load options on component init', fakeAsync(() => {
        component.attribute = <any>{taxonomyId: 22, constraintGroupId: 33};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        tick(300);
        expect(component.options).toEqual(['label1', 'label2']);
        expect(channelService.fetchChannelConstraintCollection).toHaveBeenCalledWith(22, 33, '');
    }));

    it('should fetch appropriate resource when user types text', fakeAsync(() => {
        component.attribute = <any>{taxonomyId: 22, constraintGroupId: 33};
        channelService.fetchChannelConstraintCollection.and.returnValue(<any>of({
            _embedded: {
                constraint: [
                    {label: 'label1'},
                    {label: 'label2'}
                ]
            }
        }));
        fixture.detectChanges();
        component.control.setValue('fda');
        tick(300);
        expect(channelService.fetchChannelConstraintCollection).toHaveBeenCalledWith(22, 33, 'fda');
    }));

});
