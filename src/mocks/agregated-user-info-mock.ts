export const aggregatedUserInfoMock = {
    'login': 'admin',
    'email': 'clement@shopping-feed.com',
    'roles': ['employee', 'admin'],
    'language': 'it_IT',
    '_links': {'self': {'href': '/v1/me'}},
    '_embedded': {
        'account': {'id': 19958, '_links': {'self': {'href': '/v1/account/19958'}}},
        'store': [{
            'id': 307,
            'name': 'Store 1',
            'permission': {
                'ads': '*',
                'affiliation': '*',
                'buyline': '*',
                'facturation': '*',
                'marketplaces': '*',
                'multiple': '*',
                'owner': '*',
                'retargeting': '*',
                'shopbots': '*',
                'solomo': '*',
                'statistics': '*',
                'timeline': '*',
                'tools': '*'
            },
            'order': {'total': 12},
            'timeline': {'total': 19},
            '_links': {'self': {'href': '/v1/store/307'}}
        },
            {
                'id': 308,
                'name': 'Store 2',
                'permission': {
                    'university': '*'
                },
                'order': {'total': 0},
                'timeline': {'total': 0},
                '_links': {'self': {'href': '/v1/store/307'}}
            },
            {
                'id': 309,
                'name': 'Store 3',
                'permission': {
                    'solomo': '*',
                    'statistics': '*',
                    'timeline': '*',
                    'tools': '*'
                },
                'order': {'total': 0},
                'timeline': {'total': 2},
                '_links': {'self': {'href': '/v1/store/307'}}
            }
        ]
    }
};
