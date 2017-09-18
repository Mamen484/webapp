import { Component, Input } from '@angular/core';
import { StoreChannel } from '../../core/entities/store-channel';
import { WindowRefService } from '../../core/services/window-ref.service';
import { LegacyLinkService } from '../../core/services/legacy-link.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Channel } from '../../core/entities/channel';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss']
})
export class ConfiguredChannelComponent {

    @Input() channel: StoreChannel;

    constructor(protected windowRef: WindowRefService) {
    }

    goToChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

}
