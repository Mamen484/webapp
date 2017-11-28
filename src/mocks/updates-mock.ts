export const updates = {
    'total': 3,
    'limit': 100,
    'pages': 1,
    'page': 1,
    'count': 3,
    '_links': {
        'self': {'href': '/v1/store/307/timeline?name=feed.export%2Cfeed.import\u0026until=2017-10-04T14%3A13%3A23.051Z\u0026limit=100\u0026page=1'},
        'first': {'href': '/v1/store/307/timeline?name=feed.export%2Cfeed.import\u0026until=2017-10-04T14%3A13%3A23.051Z\u0026limit=100\u0026page=1'},
        'last': {'href': '/v1/store/307/timeline?name=feed.export%2Cfeed.import\u0026until=2017-10-04T14%3A13%3A23.051Z\u0026limit=100\u0026page=1'}
    },
    '_embedded': {
        'timeline': [{
            'id': '59d4f331884e6200070a4af3',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'ask',
            'occurredAt': '2017-10-04T12:41:51+00:00',
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d4f331884e6200070a4af3'},
                'store': {'href': '/v1/store/307'}
            },
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'amazon',
                    '_links': {
                        'self': {'href': '/v1/channel/66'},
                        'image': {'href': 'https://app.shopping-feed.com/images/logos/amazon.png'}
                    }
                }
            }
        }, {
            'id': '59d4ecf3884e6200061639b3',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'ask',
            'occurredAt': '2017-10-04T12:15:12+00:00',
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d4ecf3884e6200061639b3'},
                'store': {'href': '/v1/store/307'}
            },
            '_embedded': {
                'channel': {
                    'id': 0,
                    'name': null,
                    '_links': {
                        'self': {'href': '/v1/channel/0'},
                        'image': {'href': 'https://app.shopping-feed.com/images/logos/:image.png'}
                    }
                }
            }
        }, {
            'id': '59d4f331884e6200070a4af1',
            'storeId': 307,
            'name': 'feed.import',
            'action': 'start',
            'occurredAt': '2017-10-04T11:41:51+00:00',
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d4f331884e6200070a4af1'},
                'store': {'href': '/v1/store/307'}
            }
        }]
    }
};
