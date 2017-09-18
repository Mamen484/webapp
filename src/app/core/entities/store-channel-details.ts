import { Link } from './link';

export interface StoreChannelDetails {
    name: string;
    _links: {
        self: Link,
        image: Link
    }
}