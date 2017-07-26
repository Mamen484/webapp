import { Link } from './link';
import { StoreChannelDetails } from './store-channel-details';

export interface StoreChannel {
    id: number;
    store: number;
    channel: number,
    _embedded: {
        channel: StoreChannelDetails
    },
    _links: {
        self: Link
    }
}