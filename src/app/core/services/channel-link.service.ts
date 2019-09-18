import { Injectable } from '@angular/core';
import { ChannelLinkPipe } from '../../shared/channel-link/channel-link.pipe';
import { SflWindowRefService } from 'sfl-shared/services';
import { StoreChannel } from 'sfl-shared/entities';
import { LegacyLinkService } from './legacy-link.service';

@Injectable({
    providedIn: 'root'
})
export class ChannelLinkService {

    constructor(
        protected windowRefService: SflWindowRefService,
        protected legacyLinkService: LegacyLinkService,
    ) {
    }

    navigateToChannel(channel: StoreChannel) {
        this.goToChannel(ChannelLinkPipe.getChannelLink(channel._embedded.channel));
    }

    getChannelLink(channel: StoreChannel) {
        return ChannelLinkPipe.getChannelLink(channel._embedded.channel)
    }

    protected goToChannel(channelLink) {
        this.windowRefService.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(channelLink);
    }
}
