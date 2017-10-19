export const aggregatedUserInfoMock = {
    'token': 'turudum',
    'login': 'admin',
    'email': 'clement@shopping-feed.com',
    'roles': <any>['user', 'admin'],
    'language': 'it_IT',
    '_links': {'self': {'href': '/v1/me'}},
    '_embedded': <any>{
        'account': {'id': 19958, '_links': {'self': {'href': '/v1/account/19958'}}},
        'store': [{
            'id': 307,
            'name': 'Store 1',
            'country': 'fr',
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
            'status': 'active',
            'order': {'total': 12},
            'timeline': {'total': 0},
            '_links': {'self': {'href': '/v1/store/307'}},
            'feed': {
                'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                'source': 'Prestashop'
            }
        },
            {
                'id': 308,
                'name': 'Store 2',
                'permission': {
                    'university': '*'
                },
                'status': 'deleted',
                'order': {'total': 0},
                'timeline': {'total': 12},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
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
                'status': 'suspended',
                'order': {'total': 0},
                'timeline': {'total': 22},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
            }
        ]
    }
};
