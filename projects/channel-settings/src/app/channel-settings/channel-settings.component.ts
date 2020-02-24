import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ChannelService, FullCountriesListService, SflLocalStorageService, SflUserService } from 'sfl-shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel, ChannelState, Country } from 'sfl-shared/entities';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Field } from './field';
import { AppLinkService } from './app-link.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from './settings-saved-snackbar/settings-saved-snackbar.component';
import { filter } from 'rxjs/operators';
import { googleTaxonomy } from './google-taxonomy';
import { allowedCountries } from './allowed-countries';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRowDialogComponent } from './delete-row-dialog/delete-row-dialog.component';
import { ErrorSnackbarConfig } from '../../../../../src/app/core/entities/error-snackbar-config';
import { get } from 'lodash';
import { FullstoryLoaderService } from '../fullstory-loader.service';

@Component({
    templateUrl: './channel-settings.component.html',
    styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit {

    channelId: number;
    channel: Channel;
    channelState = ChannelState;

    formGroup = new FormGroup({
        contact: new FormControl('', [Validators.required, () => this.getValidationMessages('contact')]),
        segment: new FormControl('', [Validators.required, () => this.getValidationMessages('segment')]),
        country: new FormControl('', [Validators.required, () => this.getValidationMessages('country')]),
        template: new FormArray([])
    });

    templateFields: Field[];
    appLink: Observable<string>;
    countryList: Country[] = [];
    countryNames: { [countryCode: string]: string } = {};

    googleTaxonomyList = googleTaxonomy;
    allowedCountries = allowedCountries;
    accountName = '';
    validationErrors = {};

    get templateControl() {
        return this.formGroup.controls.template as FormArray;
    }

    get templateControls() {
        return this.templateControl.controls as FormGroup[];
    }

    constructor(protected channelService: ChannelService,
                protected route: ActivatedRoute,
                protected appLinkService: AppLinkService,
                protected matSnackBar: MatSnackBar,
                protected countriesListService: FullCountriesListService,
                protected matDialog: MatDialog,
                protected router: Router,
                protected localStorage: SflLocalStorageService,
                protected userService: SflUserService,
                protected fullstoryLoaderService: FullstoryLoaderService,
                protected elementRef: ElementRef,
                protected changeDetectorRef: ChangeDetectorRef) {
    }

    addField(focus = false) {
        const formGroup = this.createTemplateRow();
        this.templateControl.push(formGroup);
        if (focus) {
            this.changeDetectorRef.detectChanges();
            const channelFields = this.elementRef.nativeElement.querySelectorAll('.channel-field');
            const input: HTMLInputElement = channelFields.item(channelFields.length - 1);
            input.focus();
        }
    }

    initializeChannel(channel) {
        this.channel = channel;
        this.channelId = channel.id;
    }

    initializeControlValues() {
        this.formGroup.controls.contact.setValue((<any>this.channel.contact).email);
        this.formGroup.controls.segment.setValue(this.channel.segment);
        this.countryList = get(this.channel, '_embedded.country', []);
        this.formGroup.controls.country.valueChanges.pipe(filter(value => value))
            .subscribe((value: string[]) => {
                this.countryList = value.map(countryCode => {
                    const match = this.countryList.find(country => country.code === countryCode);
                    if (match) {
                        return match;
                    }
                    return {code: countryCode, taxonomyId: null};
                });
            });
        this.formGroup.controls.country.setValue(this.channel.countries);
        this.getChannelTemplate()
            .forEach(({appField, channelField, defaultValue}) => {
                this.templateControl.push(this.createTemplateRow({appField, channelField, defaultValue}));
            });

        ['contact', 'segment', 'country'].forEach(controlName => {
            this.formGroup.controls[controlName].valueChanges.subscribe(() => {
                if (this.validationErrors && this.validationErrors[controlName]) {
                    this.validationErrors[controlName] = undefined;
                }
            });
        });
    }

    initializeCountryNames() {
        this.countriesListService.getCountries().subscribe(countries => {
            countries.forEach(country => this.countryNames[country.code] = country.name);
        })
    }

    getChannelTemplate() {
        if (this.channel.template && this.channel.template.length) {
            return this.channel.template;
        }
        return [{appField: '', channelField: '', defaultValue: ''}];
    }

    ngOnInit() {
        this.route.data.subscribe(({channel, fields}) => {
            this.initializeChannel(channel);
            this.initializeControlValues();
            this.templateFields = fields;
        });
        this.appLink = this.appLinkService.getLink('/');
        this.initializeCountryNames();
        this.userService.fetchAggregatedInfo().subscribe(userInfo => this.accountName = userInfo.findFirstEnabledStore().name);
        this.fullstoryLoaderService.load();
    }

    removeField(index) {
        this.matDialog.open(DeleteRowDialogComponent).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.templateControl.removeAt(index);
            }
        });
    }

    save() {
        this.validationErrors = {};
        if (!this.formGroup.valid) {
            return;
        }
        this.channelService.modifyChannel({
            contact: this.formGroup.get('contact').value,
            segment: this.formGroup.get('segment').value,
            country: this.countryList,
            template: this.formGroup.get('template').value,
        }, this.channel.id).subscribe(
            () => this.matSnackBar.openFromComponent(SettingsSavedSnackbarComponent, {duration: 2000}),
            ({error}) => {
                this.validationErrors = error.validationMessages;
                this.formGroup.controls.contact.updateValueAndValidity();
                this.formGroup.controls.segment.updateValueAndValidity();
                this.formGroup.controls.country.updateValueAndValidity();
                this.matSnackBar.open('An error occured: ' + error.detail, '', new ErrorSnackbarConfig());
            }
        );

    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
    }

    protected createTemplateRow({channelField = '', appField = '', defaultValue = ''} = {}) {
        const formGroup = new FormGroup({
                channelField: new FormControl(channelField, [Validators.required]),
                appField: new FormControl(appField, [this.validateFieldPair]),
                defaultValue: new FormControl(defaultValue, [this.validateFieldPair]),
            }, [this.validateRow]
        );
        formGroup.statusChanges.subscribe(status => this.validateControl(formGroup, ['appField', 'defaultValue']));
        return formGroup;
    }

    protected validateControl(formGroup: FormGroup, controlNames: string[]) {
        controlNames.forEach(controlName => {
            formGroup.controls[controlName].markAsTouched({onlySelf: true});
            formGroup.controls[controlName].updateValueAndValidity({onlySelf: true});
        });
        // do not emit event to prevent recursion
        formGroup.updateValueAndValidity({onlySelf: true, emitEvent: false});
    }

    protected validateFieldPair(control: FormControl) {
        return control.parent && control.parent.getError('invalidField') ? {invalidField: true} : null;
    }

    protected validateRow(control: FormGroup): ValidationErrors {
        return control && control.controls.appField.value && control.controls.defaultValue.value ? {invalidField: true} : null;
    }

    protected getValidationMessages(path) {
        const field = get(this.validationErrors, path);
        if (!field) {
            return null;
        }
        const errors = Object.values(field);
        return errors.length
            ? {validationError: errors[0]}
            : null;
    }


}
