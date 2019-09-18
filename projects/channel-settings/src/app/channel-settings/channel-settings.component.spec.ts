import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingsComponent } from './channel-settings.component';
import { ChannelService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subject } from 'rxjs';
import { Channel, Country } from 'sfl-shared/entities';
import { Field } from './field';
import { AppLinkService } from './app-link.service';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from './settings-saved-snackbar/settings-saved-snackbar.component';
import { FullCountriesListService } from 'sfl-shared/utils/country-autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRowDialogComponent } from './delete-row-dialog/delete-row-dialog.component';
import { RowValidationDialogComponent } from './row-validation-dialog/row-validation-dialog.component';

describe('ChannelSettingsComponent', () => {
    let component: ChannelSettingsComponent;
    let fixture: ComponentFixture<ChannelSettingsComponent>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let routeData: Subject<{ channel: Channel, fields?: Field[] }>;
    let appLinkService: jasmine.SpyObj<AppLinkService>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let countriesListService: jasmine.SpyObj<FullCountriesListService>;
    let countries$: Subject<Country[]>;
    let matDialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        appLinkService = jasmine.createSpyObj('AppLinkService spy', ['getLink']);
        routeData = new Subject();
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        countriesListService = jasmine.createSpyObj('FullCountriesListService spy', ['getCountries']);
        countries$ = new Subject<Country[]>();
        countriesListService.getCountries.and.returnValue(countries$.asObservable());
        matDialog = jasmine.createSpyObj('MatDialog spy', ['open']);


        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ChannelSettingsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: ActivatedRoute, useValue: {data: routeData}},
                {provide: AppLinkService, useValue: appLinkService},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: FullCountriesListService, useValue: countriesListService},
                {provide: MatDialog, useValue: matDialog},
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
        prepareChannelForSave();
        component.save();
        expect(channelService.modifyChannel).toHaveBeenCalledWith(<Channel>{
            contact: 'test',
            segment: 'clothes',
            country: [{code: 'fr', taxonomyId: null}, {code: 'uk', taxonomyId: null}],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        }, 23);
    });

    it('should show a dialog on save() if both appField and defaultValue contain a value', () => {
        channelService.modifyChannel.and.returnValue(of({}));
        routeData.next({channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['fr', 'uk'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'some value'}]
        });
        component.channel = {id: 23};
        component.save();
        expect(matDialog.open).toHaveBeenCalledWith(RowValidationDialogComponent);
    });

    it('should NOT call saveChannel endpoint on save() if both appField and defaultValue contain a value', () => {
        channelService.modifyChannel.and.returnValue(of({}));
        routeData.next({channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['fr', 'uk'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'some value'}]
        });
        component.channel = {id: 23};
        component.save();
        expect(channelService.modifyChannel).not.toHaveBeenCalled();
    });

    it('should NOT call saveChannel endpoint on save() if the form is invalid', () => {
        channelService.modifyChannel.and.returnValue(of({}));
        routeData.next({channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        component.channel = {id: 23};
        component.save();
        expect(channelService.modifyChannel).not.toHaveBeenCalled();
    });

    it('should show a snackbar on successful save', () => {
        prepareChannelForSave();
        component.save();
        expect(matSnackBar.openFromComponent).toHaveBeenCalledWith(SettingsSavedSnackbarComponent, {duration: 2000});
    });

    it('should open a removal dialog when remove icon clicked', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.addField();
        component.addField();
        component.addField();
        component.templateControl.setValue([
            {channelField: 'someChannelField1', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField2', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField3', appField: 'someSfField', defaultValue: ''},
        ]);
        component.removeField(1);
        expect(matDialog.open).toHaveBeenCalledWith(DeleteRowDialogComponent);
    });

    it('should remove a template row by specified index, if user confirmed deletion', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(true)});
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

    it('should NOT remove a template row by specified index, if user canceled deletion', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(false)});
        component.addField();
        component.addField();
        component.addField();
        component.templateControl.setValue([
            {channelField: 'someChannelField1', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField2', appField: 'someSfField', defaultValue: ''},
            {channelField: 'someChannelField3', appField: 'someSfField', defaultValue: ''},
        ]);
        component.removeField(1);
        expect(component.templateControls.length).toBe(3);
    });

    it('should add as many fields as template has rows', () => {
        routeData.next({
            channel: {
                id: 22, contact: {email: 'some email'}, countries: [], segment: 'some segment', template: [
                    {channelField: 'someChannelField1', appField: 'someSfField', defaultValue: ''},
                    {channelField: 'someChannelField2', appField: 'someSfField', defaultValue: ''},
                    {channelField: 'someChannelField3', appField: 'someSfField', defaultValue: ''},
                ], _embedded: <any>{country: []}
            }
        });
        expect(component.templateControl.length).toBe(3);
    });

    it('should add an empty row if template has no rows', () => {
        routeData.next({
            channel: {
                id: 22, contact: {email: 'some email'}, countries: [], segment: 'some segment', _embedded: <any>{country: []}
            }
        });
        expect(component.templateControl.length).toBe(1);
    });

    it('should assign templateFields', () => {
        routeData.next({fields: [<any>{someProp: 'someValue'}], channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        expect(component.templateFields).toEqual([<any>{someProp: 'someValue'}]);
    });

    it('should assign country names', () => {
        countries$.next([
            {code: 'FR', name: 'France'},
            {code: 'DE', name: 'Germany'},
            {code: 'US', name: 'United States'},
        ]);
        expect(component.countryNames).toEqual({FR: 'France', DE: 'Germany', US: 'United States'});
    });

    it('should not remove existing taxonomyId values', () => {
        routeData.next({channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        component.countryList = [{code: 'FR', taxonomyId: 110}];
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['FR', 'UK'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        });
        expect(component.countryList).toEqual([{code: 'FR', taxonomyId: 110}, {code: 'UK', taxonomyId: null}])
    });

    it('should use taxonomyId values from channel', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['FR', 'UK'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        });
        expect(component.countryList).toEqual([{code: 'FR', taxonomyId: 110}, {code: 'UK', taxonomyId: null}])
    });

    function prepareChannelForSave() {
        channelService.modifyChannel.and.returnValue(of({}));
        routeData.next({channel: {id: 100, contact: <any>{}, _embedded: <any>{country: []}}});
        component.formGroup.setValue({
            contact: 'test',
            segment: 'clothes',
            country: ['fr', 'uk'],
            template: [{channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''}]
        });
        component.channel = {id: 23};
    }
});
