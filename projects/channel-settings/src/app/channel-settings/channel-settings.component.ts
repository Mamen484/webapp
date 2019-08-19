import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';

@Component({
    templateUrl: './channel-settings.component.html',
    styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit {

    channelId = 32592;

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
    }


}
