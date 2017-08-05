export const channelsResponseMock = {
    'total': 100,
    'limit': 10,
    'pages': 10,
    'page': 1,
    'count': 10,
    '_links': {
        'self': {
            'href': '/v1/channel'
        }
    },
    '_embedded':
        {
            'channel':
                [
                    {
                        'id': 456,
                        'name': 'amazon',
                        'description': 'Some two-line description of the channel',
                        'type': 'marketplace',
                        'segment': 'everything',
                        'offer': 'http://example.fr',
                        'countries': [],
                        '_links': {
                            'self': {
                                'href': '/v1/channel/456'
                            },
                            'image': {
                                'href': '/amazon.jpg'
                            }
                        }
                    },
                    {
                        'id': 456,
                        'name': 'amazon',
                        'description': 'Some short description',
                        'type': 'marketplace',
                        'segment': 'everything',
                        'offer': 'http://example.fr',
                        'countries': [],
                        '_links': {
                            'self': {
                                'href': '/v1/channel/456'
                            },
                            'image': {
                                'href': '/amazon.jpg'
                            }
                        }
                    },
                    {
                        'id': 456,
                        'name': 'amazon',
                        'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                        'type': 'marketplace',
                        'segment': 'everything',
                        'offer': 'http://example.fr',
                        'countries': [],
                        '_links': {
                            'self': {
                                'href': '/v1/channel/456'
                            },
                            'image': {
                                'href': '/amazon.jpg'
                            }
                        }
                    }
                ]
        }
}
