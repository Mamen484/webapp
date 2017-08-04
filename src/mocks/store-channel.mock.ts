class MockChannel {
    'id' = 123;
    'store' = 45;
    'channel' = 789;
    '_embedded' = {
        'channel': {
            'name': 'amazon',
            '_links': {
                'self': {
                    'href': '/v1/channel/1'
                },
                'image': {
                    'href': '/amazon.jpg'
                }
            }
        }
    };
    '_links' = {
        'self': {
            'href': '/v1/storechannel/123'
        }
    };

    constructor(name, id) {
        this._embedded.channel.name = name;
        this.id = id;
    }
}

export const storeChannelMock = {
    'total': 100,
    'limit': 10,
    'pages': 10,
    'page': 1,
    'count': 10,
    '_links': {
        'self': {
            'href': '/v1/storeChannel'
        }
    },
    '_embedded': {
        'storeChannel': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => new MockChannel('amazon' + id, id))
    }
};
