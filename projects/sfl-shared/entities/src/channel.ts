import { Link } from './link';
import { ChannelTemplate } from './channel-template';

export interface Channel {
    id?: number;
    name?: string;
    /* object - on GET, string - on PUT */
    contact?: {email: string} | string;
    description?: string;
    installed?: boolean;
    type?: string;
    segment?: string;
    offer?: string;
    countries?: any[],
    country?: any[]; // only for PUT request
    _links?: {
        self: Link,
        image: Link,
    };
    template: ChannelTemplate[];
    // create channel request
    feedType?: string;
    feed?: {
        separator?: string,
        enclosure?: string,
        head: string,
        productTag: string,
        headerFirst: string,
    };
}
