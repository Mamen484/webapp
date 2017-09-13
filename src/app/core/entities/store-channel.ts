import { Link } from './link';
import { StoreChannelDetails } from './store-channel-details';
import { ChannelStatistics } from '../channel-statistics';

export interface StoreChannel {
    id: number;
    store: number;
    installed: true;
    // custom field set in runtime
    statistics: ChannelStatistics;
    channel: number,
    _embedded: {
        channel: StoreChannelDetails
    },
    _links: {
        self: Link
    }
}
