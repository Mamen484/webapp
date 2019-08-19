import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'sfl-shared/services';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'sfl-shared/entities';

@Component({
    templateUrl: './channel-settings.component.html',
    styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit {

    channelId: number;
    channel: Channel;

    constructor(protected channelService: ChannelService, protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(({channel}) => {
            this.channel = channel;
            this.channelId = channel.id;
        })
    }


}
