import { Link } from './link';
import { ChannelType } from './channel-type.enum';

export interface StoreChannelDetails {
    name: string;
    id: number;
    type: ChannelType;
    _links: {
        self: Link,
        image: Link
    }
}