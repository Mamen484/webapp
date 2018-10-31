import { FeedSource } from 'sfl-shared/src/lib/core/entities';

export class CreateStoreFeed {
    url = '';
    source: FeedSource;
    mapping: {[key: string]: string} = <{[key: string]: string}>{};
    settings = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
