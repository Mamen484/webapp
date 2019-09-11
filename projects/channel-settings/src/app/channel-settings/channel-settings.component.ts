import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'sfl-shared/entities';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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

    constructor(protected channelService: ChannelService, protected route: ActivatedRoute) {
    }

    get templateControl() {
        return this.formGroup.controls.template as FormArray;
    }

    get templateControls() {
        return this.templateControl.controls as FormGroup[];
    }

    addField() {
        this.templateControl.push(new FormGroup({
                channelField: new FormControl(),
                sfField: new FormControl(),
                defaultValue: new FormControl(),
            }
        ));
    }

    initializeChannel(channel) {
        this.channel = channel;
        this.channelId = channel.id;
        if (this.channel.template) {
            this.channel.template.forEach(() => this.addField());
        } else {
            this.addField();
        }
    }

    ngOnInit() {
        this.route.data.subscribe(({channel}) => {

            this.initializeChannel(channel);

            this.formGroup.setValue({
                contact: (<any>this.channel.contact).email,
                segment: this.channel.segment,
                country: this.channel.countries,
                template: this.channel.template || [{sfField: '', channelField: '', defaultValue: ''}],
            });
        })
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
