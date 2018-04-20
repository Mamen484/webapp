import { ChannelType } from './channel-type.enum';
import { ChannelCategory } from './channel-category.enum';

export class ChannelsRequestParams {
    page = 1;
    limit = 200;
    searchQuery = '';
    country = '';
    type: keyof typeof ChannelType | '' = '';
    segment: keyof typeof ChannelCategory | '' = '';
    status = '';

    constructor(installed = false) {
        if (installed) {
            this.status = 'installed';
        }
    }
}
