import { FeedSource } from './feed-source';

export class StoreFeed {
    url = '';
    source: FeedSource;
    mapping ? = <any>{};
    settings?: {
        xmlProductNode?: string,
        csvFieldSeparator?: string
    } = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
