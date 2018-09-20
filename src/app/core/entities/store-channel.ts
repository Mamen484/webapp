import { Link } from './link';
import { ChannelStatistics } from './channel-statistics';
import { Channel } from './channel';

export interface StoreChannel {
    id: number;
    store: number;
    installed: true;
    // custom field set in runtime, statistics for the installed channel
    statistics: ChannelStatistics;

    // statistics for the non-installed channel
    stats: {
        turnoverAverage?: number,
        connectedStores?: number,
        totalStores?: number,
    },
    channel: number,
    _embedded: {
        channel: Channel
    },
    _links: {
        self: Link
    }
}
