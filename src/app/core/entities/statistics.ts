import { Link } from './link';
import { ChannelStatistics } from '../channel-statistics';

export interface Statistics {
    id: number;
    symbol: string;
    revenue: number;
    orders: number;
    clicks: number;
    channels: ChannelStatistics[],
    _links: {
        self: Link,
        store: Link
    }
}
