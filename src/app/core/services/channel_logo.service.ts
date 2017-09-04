import { Injectable } from '@angular/core';

@Injectable()
export class ChannelLogoService {
    public getLogoUrl(channelName: string) {
        return '/images/logos/' + channelName + '.png';
    }
}