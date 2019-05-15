import { ChannelAttribute } from './channel-attribute';

export interface Autotag {
    id: number;
    feedId: number;
    catalogCategoryId: number;
    channelAttributeId: number; // = ChannelAttribute.id
    value?: number;
    _embedded: {channelAttribute: ChannelAttribute};
}
