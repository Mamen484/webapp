import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelService } from 'sfl-shared/services';

@Component({
    selector: 'sfcs-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @Input() channelId: number;

    channelSettingsGroup = new FormGroup({
        contact: new FormControl(),
        segment: new FormControl(),
        country: new FormControl(),
    });

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
    }

    saveSettings() {
        this.channelService.modifyChannel({
            contact: this.channelSettingsGroup.get('contact').value,
            segment: this.channelSettingsGroup.get('segment').value,
            country: this.channelSettingsGroup.get('country').value.map(code => ({code})),
        }, this.channelId).subscribe();
    }
}
