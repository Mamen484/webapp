import { Link } from 'sfl-shared/entities';
import { ChannelStatistics } from 'sfl-shared/entities';

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
