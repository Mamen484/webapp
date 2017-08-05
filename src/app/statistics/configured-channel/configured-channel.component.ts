import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChannelStatistics } from '../../core/channel-statistics';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss']
})
export class ConfiguredChannelComponent implements OnInit {

    @Input() channel: { name: string, image: string, statistics: ChannelStatistics };
    appUrl = environment.APP_URL;

    constructor() {
    }

    ngOnInit() {
    }

}
