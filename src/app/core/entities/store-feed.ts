import { FeedSource } from './feed-source';

export class StoreFeed {
    url = '';
    source: FeedSource;
    mapping = <any>{};
    settings = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}