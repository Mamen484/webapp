import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StoreChannel } from '../../core/entities/store-channel';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss']
})
export class ConfiguredChannelComponent {

    @Input() channel: StoreChannel;
    appUrl = environment.APP_URL;

    constructor() {
    }

}
