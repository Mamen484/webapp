import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';
import { ActivatedRoute } from '@angular/router';
import { Channel, Country } from 'sfl-shared/entities';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from './field';
import { AppLinkService } from './app-link.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from './settings-saved-snackbar/settings-saved-snackbar.component';
import { FullCountriesListService } from 'sfl-shared/utils/country-autocomplete';
import { filter } from 'rxjs/operators';
import { googleTaxonomy } from './google-taxonomy';
import { allowedCountries } from './allowed-countries';

@Component({
    templateUrl: './channel-settings.component.html',
    styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit {

    channelId: number;
    channel: Channel;

    formGroup = new FormGroup({
        contact: new FormControl(),
        segment: new FormControl(),
        country: new FormControl(),
        template: new FormArray([])
    });

    templateFields: Field[];
    appLink: Observable<string>;
    countryList: Country[] = [];
    countryNames: { [countryCode: string]: string } = {};

    googleTaxonomyList = googleTaxonomy;
    allowedCountries = allowedCountries;

    constructor(protected channelService: ChannelService,
                protected route: ActivatedRoute,
                protected appLinkService: AppLinkService,
                protected matSnackBar: MatSnackBar,
                protected countriesListService: FullCountriesListService) {
    }

    get templateControl() {
        return this.formGroup.controls.template as FormArray;
    }

    get templateControls() {
        return this.templateControl.controls as FormGroup[];
    }

    addField() {
        this.templateControl.push(this.createTemplateRow());
    }

    createTemplateRow({channelField = '', appField = '', defaultValue = ''} = {}) {
        return new FormGroup({
                channelField: new FormControl(channelField, [Validators.required]),
                appField: new FormControl(appField),
                defaultValue: new FormControl(defaultValue),
            }
        )
    }

    initializeChannel(channel) {
        this.channel = channel;
        this.channelId = channel.id;
    }

    initializeControlValues() {
        this.formGroup.controls.contact.setValue((<any>this.channel.contact).email);
        this.formGroup.controls.segment.setValue(this.channel.segment);
        this.countryList = this.channel._embedded.country;
        this.formGroup.controls.country.valueChanges.pipe(filter(value => value))
            .subscribe((value: string[]) => {
                this.countryList = value.map(countryCode => {
                    const match = this.countryList.find(country => country.code === countryCode);
                    if (match) {
                        return match;
                    }
                    return {code: countryCode};
                });
            });
        this.formGroup.controls.country.setValue(this.channel.countries);
        this.getChannelTemplate()
            .forEach(({appField, channelField, defaultValue}) => {
                this.templateControl.push(this.createTemplateRow({appField, channelField, defaultValue}));
            })
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
    }

    removeField(index) {
        this.templateControl.removeAt(index);
    }

    save() {
        this.channelService.modifyChannel({
            contact: this.formGroup.get('contact').value,
            segment: this.formGroup.get('segment').value,
            country: this.countryList,
            template: this.formGroup.get('template').value,
        }, this.channel.id).subscribe(() => {
            this.matSnackBar.openFromComponent(SettingsSavedSnackbarComponent, {
                duration: 2000,
            });
        });
    }


}
