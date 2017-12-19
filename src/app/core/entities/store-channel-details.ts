import { Link } from './link';

export interface StoreChannelDetails {
    name: string;
    id: number;
    _links: {
        self: Link,
        image: Link
    }
}