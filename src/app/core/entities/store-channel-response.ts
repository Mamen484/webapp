import { StoreChannel } from './store-channel';
import { Link } from './link';

export interface StoreChannelResponse {
    total: number;
    limit: number;
    pages: number;
    page: number;
    count: number;
    _links: {
        self: Link
    },
    _embedded: {
        storeChannel: StoreChannel[]
    }
}