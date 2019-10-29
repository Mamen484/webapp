import { FeedSource } from './feed-source';

export class StoreFeed {
    url = '';
    source: FeedSource;
    mapping ? = <any>{};
    settings?: {
        xmlProductNode?: string,
        csvFieldSeparator?: string,
        credentials?: {
            type: string;
            accessToken: string;
            expiryTimeAccessToken: string;
            refreshToken: string;
            expiryTimeRefreshToken: string;
        }
    } = {
        xmlProductNode: '',
        csvFieldSeparator: ''
    }
}
