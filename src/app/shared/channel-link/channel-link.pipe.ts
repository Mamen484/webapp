import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from 'sfl-shared/entities';

@Pipe({
    name: 'sfChannelLink'
})
export class ChannelLinkPipe implements PipeTransform {

    transform(channel: Channel): any {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

}
