import { FeedSource } from 'sfl-shared/entities';

export class CreateStoreFeed {
    url = '';
    source: FeedSource;
    mapping: {[key: string]: string} = <{[key: string]: string}>{};
    settings = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
