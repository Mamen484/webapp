import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingsComponent } from './channel-settings.component';
import { ChannelService, FullCountriesListService, SflLocalStorageService, SflUserService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { AggregatedUserInfo, Channel, Country } from 'sfl-shared/entities';
import { Field } from './field';
import { AppLinkService } from './app-link.service';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from './settings-saved-snackbar/settings-saved-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRowDialogComponent } from './delete-row-dialog/delete-row-dialog.component';
import { ErrorSnackbarConfig } from '../../../../../src/app/core/entities/error-snackbar-config';
import { MatMenuModule } from '@angular/material/menu';
import { FormArray, FormGroup } from '@angular/forms';

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
    let router: jasmine.SpyObj<Router>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let userService: jasmine.SpyObj<SflUserService>;
    let userData: Subject<AggregatedUserInfo>;

    beforeEach(async(() => {
        channelService = jasmine.createSpyObj('ChannelService spy', ['modifyChannel']);
        appLinkService = jasmine.createSpyObj('AppLinkService spy', ['getLink']);
        routeData = new Subject();
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent', 'open']);
        countriesListService = jasmine.createSpyObj('FullCountriesListService spy', ['getCountries']);
        countries$ = new Subject<Country[]>();
        countriesListService.getCountries.and.returnValue(countries$.asObservable());
        matDialog = jasmine.createSpyObj('MatDialog spy', ['open']);
        router = jasmine.createSpyObj('Router spy', ['navigate']);
        localStorage = jasmine.createSpyObj('LocalStorage spy', ['removeItem']);
        userService = jasmine.createSpyObj('UserService spy', ['fetchAggregatedInfo']);
        userData = new Subject();
        userService.fetchAggregatedInfo.and.returnValue(userData);


        TestBed.configureTestingModule({
            imports: [MatMenuModule],
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [ChannelSettingsComponent],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: ActivatedRoute, useValue: {data: routeData}},
                {provide: AppLinkService, useValue: appLinkService},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: FullCountriesListService, useValue: countriesListService},
                {provide: MatDialog, useValue: matDialog},
                {provide: Router, useValue: router},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: SflUserService, useValue: userService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChannelSettingsComponent);
        component = fixture.componentInstance;
        component.channel = {};
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

    it('should show a snackbar on a save error', () => {
        prepareChannelForSave();
        channelService.modifyChannel.and.returnValue(throwError({error: {detail: 'some error'}}));
        component.save();
        expect(matSnackBar.open).toHaveBeenCalledWith('An error occured: some error', '', new ErrorSnackbarConfig());
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

    it('should logout', () => {
        component.logout();
        expect(localStorage.removeItem).toHaveBeenCalledWith('Authorization');
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should initialize an account name', () => {
        userData.next(AggregatedUserInfo.create({_embedded: {store: [{name: 'someName'}]}}));
        expect(component.accountName).toBe('someName');
    });

    it('should show invalidField error on form group and fields appField and defaultValue' +
        'if both appField and defaultValue are specified', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'someDefaultValue'},
        );
        expect(templateRow.getError('invalidField')).toBe(true);
        expect(templateRow.controls.appField.getError('invalidField')).toBe(true);
        expect(templateRow.controls.defaultValue.getError('invalidField')).toBe(true);
    });

    it('should NOT show invalidField error on form group and fields appField and defaultValue if only appField is specified', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: 'someSfField', defaultValue: ''},
        );
        expect(templateRow.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.appField.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.defaultValue.getError('invalidField')).toBeFalsy();
    });

    it('should NOT show invalidField error on form group and fields appField and defaultValue if only defaultValue is specified', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: '', defaultValue: 'someDefaultValue'},
        );
        expect(templateRow.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.appField.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.defaultValue.getError('invalidField')).toBeFalsy();
    });

    it('should NOT show invalidField error after a new valid appField value specified', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'defaultValue'},
        );
        templateRow.controls.appField.setValue('');
        expect(templateRow.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.appField.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.defaultValue.getError('invalidField')).toBeFalsy();
    });

    it('should NOT show invalidField error after a new valid defaultValue value specified', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'defaultValue'},
        );
        templateRow.controls.defaultValue.setValue('');
        expect(templateRow.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.appField.getError('invalidField')).toBeFalsy();
        expect(templateRow.controls.defaultValue.getError('invalidField')).toBeFalsy();
    });

    it('should set the valid status for template control when both appField and defaultValue had values,' +
        ' and one of them was removed', () => {
        routeData.next({
            channel: {
                id: 100, contact: <any>{}, _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 110}
                    ]
                }
            }
        });
        const templateRow = <FormGroup>(<FormArray>component.formGroup.controls.template).controls[0];
        templateRow.setValue(
            {channelField: 'someChannelField', appField: 'someSfField', defaultValue: 'defaultValue'},
        );
        templateRow.controls.defaultValue.setValue('');
        expect(templateRow.errors).toBe(null);
        expect(templateRow.valid).toBe(true);
    });

    it('should assign the countryList', () => {
        routeData.next({
            channel: {
                id: 22,
                contact: {email: 'some email'},
                countries: ['FR', 'US'],
                segment: 'some segment',
                _embedded: <any>{
                    country: [
                        {code: 'FR', taxonomyId: 122},
                        {code: 'DE', taxonomyId: null},
                        {code: 'US', taxonomyId: null},
                    ],
                }
            }
        });
        expect(component.countryList).toEqual(<any>[
            {code: 'FR', taxonomyId: 122},
            {code: 'US', taxonomyId: null}]);
    });

    it('should initialize the countryList with empty array if no value provided', () => {
        routeData.next({
            channel: {id: 22, contact: {email: 'some email'}, countries: [], segment: 'some segment'}
        });
        expect(component.countryList).toEqual([]);
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
