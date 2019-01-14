import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from 'sfl-shared/entities';

@Pipe({
    name: 'sfChannelLink'
})
export class ChannelLinkPipe implements PipeTransform {

    static getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    transform(channel: Channel): any {
        return ChannelLinkPipe.getChannelLink(channel);
    }

}
