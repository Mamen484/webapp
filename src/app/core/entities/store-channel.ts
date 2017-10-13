import { Link } from './link';
import { ChannelStatistics } from './channel-statistics';
import { Channel } from './channel';

export interface StoreChannel {
    id: number;
    store: number;
    installed: true;
    // custom field set in runtime
    statistics: ChannelStatistics;
    channel: number,
    _embedded: {
        channel: Channel
    },
    _links: {
        self: Link
    }
}
