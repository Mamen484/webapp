import { DynamicMockInterface } from './dynamic-mock.interface';

export class PagedResponseFactory {
    'total' = 95;
    'limit' = 10;
    'pages' = 10;
    'page' = 1;
    'count' = 10;
    '_links' = {
        'self': {
            'href': '/v1/channel'
        }
    };
    _embedded: {[key: string]: any[]} = {};


    constructor(page, limit, dynamicMock: DynamicMockInterface, dataKey) {
        this.page = page;
        this.count = this.page === this.pages ? this.total % limit : limit;
        this._embedded[dataKey] = dynamicMock.generate(this.count);
    }
}
