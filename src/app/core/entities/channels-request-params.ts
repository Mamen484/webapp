import { ChannelLanguage } from './channel-language.enum';
import { ChannelType } from './channel-type.enum';
import { ChannelCategory } from './channel-category.enum';

export class ChannelsRequestParams {
    page = 1;
    limit = 200;
    searchQuery = '';
    country: keyof typeof ChannelLanguage | '' = '';
    type: keyof typeof ChannelType | '' = '';
    segment: keyof typeof ChannelCategory | '' = '';
    status = '';
}
