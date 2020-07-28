import { ChannelAttribute } from './channel-attribute';

export interface Autotag {
    id: number;
    feedId: number;
    catalogCategoryId: number;
    channelAttributeId: number; // = ChannelAttribute.id
    value?: string;
    _embedded: {attribute: ChannelAttribute};

    // runtime variables
    modified: boolean;
}
