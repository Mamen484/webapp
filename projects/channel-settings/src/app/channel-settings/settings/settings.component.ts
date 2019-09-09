import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelService } from 'sfl-shared/services';
import { Channel } from 'sfl-shared/entities';

@Component({
    selector: 'sfcs-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @Input() channel: Channel;

    channelSettingsGroup = new FormGroup({
        contact: new FormControl(),
        segment: new FormControl(),
        country: new FormControl(),
    });

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
        this.channelSettingsGroup.setValue({
            contact: (<any>this.channel.contact).email,
            segment: this.channel.segment,
            country: this.channel.countries,
        });
    }

    saveSettings() {
        this.channelService.modifyChannel({
            contact: this.channelSettingsGroup.get('contact').value,
            segment: this.channelSettingsGroup.get('segment').value,
            country: this.channelSettingsGroup.get('country').value.map(code => ({code})),
        }, this.channel.id).subscribe();
    }
}
