import { FeedSource } from './feed-source';

export class StoreFeed {
    url = '';
    source: FeedSource;
    mapping: { [key: string]: string | string[] } = {};
    settings = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
