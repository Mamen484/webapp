import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../../core/entities/channel';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-suggested-channel',
    templateUrl: './suggested-channel.component.html',
    styleUrls: ['./suggested-channel.component.scss']
})
export class SuggestedChannelComponent implements OnInit {

    @Input() channel: Channel;
    appUrl = environment.APP_URL;

    constructor() {
    }

    ngOnInit() {
    }

}
