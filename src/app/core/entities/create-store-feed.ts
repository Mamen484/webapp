import { FeedSource } from './feed-source';

export class CreateStoreFeed {
    url = '';
    source: FeedSource;
    mapping: {[key: string]: string} = <{[key: string]: string}>{};
    settings = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
