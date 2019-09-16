import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'sfl-shared/entities';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Field } from './field';
import { AppLinkService } from './app-link.service';
import { Observable } from 'rxjs';

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

    constructor(protected channelService: ChannelService,
                protected route: ActivatedRoute,
                protected appLinkService: AppLinkService) {
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
                channelField: new FormControl(channelField),
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
        this.formGroup.controls.country.setValue(this.channel.countries);
        const template = this.channel.template || [{appField: '', channelField: '', defaultValue: ''}];
        template.forEach(({appField, channelField, defaultValue}) => {
            this.templateControl.push(this.createTemplateRow({appField, channelField, defaultValue}));
        })
    }

    ngOnInit() {
        this.route.data.subscribe(({channel, fields}) => {
            this.initializeChannel(channel);
            this.initializeControlValues();
            this.templateFields = fields;
        });
        this.appLink = this.appLinkService.getLink('/');
    }

    removeField(index) {
        this.templateControl.removeAt(index);
    }

    save() {
        this.channelService.modifyChannel({
            contact: this.formGroup.get('contact').value,
            segment: this.formGroup.get('segment').value,
            country: this.formGroup.get('country').value.map(code => ({code})),
            template: this.formGroup.get('template').value,
        }, this.channel.id).subscribe();
    }


}
