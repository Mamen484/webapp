import { ChannelAttribute } from './channel-attribute';

export interface Autotag {
    id: number;
    feedId: number;
    channelAttributeId: number; // = ChannelAttribute.id
    value?: string;
    _embedded: {attribute: ChannelAttribute};
}
