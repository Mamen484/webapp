import { Link } from './link';
import { ChannelStatistics } from '../channel-statistics';

export interface Statistics {
    id: number;
    currency: string;
    revenue: number;
    orders: number;
    clicks: number;
    _embedded: {channel: ChannelStatistics[]},
    _links: {
        self: Link,
        store: Link
    }
}
