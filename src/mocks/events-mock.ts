export const events = {
    '_links': {
        'self': {
            'href': 'https://app.shopping-feed.com/timeline/events?page=1'
        },
        'next': {
            'href': 'https://app.shopping-feed.com/timeline/events?page=2'
        }
    },
    '_embedded': {
        'events': [
            {
                'type': 'rule.transformation',
                'operation': 'update',
                'occurredAt': '2016-10-19T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            },
            {
                'type': 'rule.transformation',
                'operation': 'create',
                'occurredAt': '2016-10-19T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            },
            {
                'type': 'rule.transformation',
                'operation': 'delete',
                'occurredAt': '2016-10-18T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            },
            {
                'type': 'rule.transformation',
                'operation': 'read',
                'occurredAt': '2016-10-19T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            },
            {
                'type': 'order.lifecycle',
                'operation': 'ship',
                'occurredAt': '2016-10-18T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            },
            {
                'type': 'order.lifecycle',
                'operation': 'import',
                'occurredAt': '2016-10-17T09:25:45+0000',
                '_embedded': {
                    'rules': [
                        {
                            '_links': {
                                'self': {
                                    'href': '/tools/rules'
                                }
                            },
                            'id': 3,
                            'name': 'Une règle'
                        }
                    ]
                }
            }
        ]
    }
};
