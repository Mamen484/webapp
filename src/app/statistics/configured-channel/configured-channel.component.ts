import { Component, Input } from '@angular/core';
import { StoreChannel } from '../../core/entities/store-channel';
import { WindowRefService } from '../../core/services/window-ref.service';
import { Channel } from '../../core/entities/channel';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss']
})
export class ConfiguredChannelComponent {

    @Input() channel: StoreChannel;
    @Input() hasStatisticsPermission = false;

    constructor(protected windowRef: WindowRefService) {
    }

    goToChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

}
