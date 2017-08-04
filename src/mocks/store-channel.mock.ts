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

    constructor(name) {
        this._embedded.channel.name = name;
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
        'storeChannel': [
            new MockChannel('amazon'),
            new MockChannel('amazon1'),
            new MockChannel('amazon2'),
            new MockChannel('amazon3'),
            new MockChannel('amazon4'),
            new MockChannel('amazon5'),
            new MockChannel('amazon6'),
            new MockChannel('amazon7'),
            new MockChannel('amazon8'),
            new MockChannel('amazon9'),
            new MockChannel('amazon10'),
        ]
    }
};
