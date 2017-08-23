export const updates = {
    '_links': {
        'self': {
            'href': 'https://app.shopping-feed.com/timeline/updates'
        }
    },
    '_embedded': {
        'updates': [
            {
                'type': 'feed.export',
                'operation': 'finish',
                'occurredAt': '2016-10-19T05:50:45+0000',
                '_embedded': {
                    'channel': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/ebay'
                                }
                            },
                            'name': 'Ebay'
                        }
                    ]
                }
            },
            {
                'type': 'feed.import',
                'operation': 'ask',
                'occurredAt': '2016-10-19T09:52:45+0000',
                '_embedded': {
                    'channel': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/ebay'
                                }
                            },
                            'name': 'Ebay'
                        }
                    ]
                }
            },
            {
                'type': 'feed.import',
                'operation': 'start',
                'occurredAt': '2016-10-19T12:12:45+0000',
                '_embedded': {
                    'channel': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/ebay'
                                }
                            },
                            'name': 'Ebay'
                        }
                    ]
                }
            },

        ]
    }
};
