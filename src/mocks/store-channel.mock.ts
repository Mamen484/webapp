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
            {
                'id': 123,
                'store': 456,
                'channel': 789,
                '_embedded': {
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
                },
                '_links': {
                    'self': {
                        'href': '/v1/storechannel/123'
                    }
                }
            }
        ]
    }
};