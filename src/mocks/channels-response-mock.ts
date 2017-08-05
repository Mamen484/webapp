let descriptions = [
    'Some two-line description of the channel',
    'Some short description',
    'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below'
];

class ChannelDynamicMock {

    'id' = 456;
    'name' = 'amazon';
    'description' = 'Some two-line description of the channel';
    'type' = 'marketplace';
    'segment' = 'everything';
    'offer' = 'http://example.fr';
    'countries' = [];
    '_links' = {
        'self': {
            'href': '/v1/channel/456'
        },
        'image': {
            'href': '/amazon.jpg'
        }
    };

    static generate(amount) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
            let channel = new ChannelDynamicMock();
            let random = Math.round(Math.random() * 300);
            channel.name = 'amazon' + random;
            channel.description = descriptions[random % 3];
            return channel;
        });
    }

}

export class ChannelsResponseDynamicMock {
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
    _embedded = {
        'channel': []
    };


    constructor(page) {
        this.page = page;
        this.count = this.page === this.pages ? this.total % this.limit : this.count;
        this._embedded.channel = ChannelDynamicMock.generate(this.count);
    }
}