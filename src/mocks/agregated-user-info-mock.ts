import { Observable } from 'rxjs/Observable';

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
            'order': {'total': 12},
            'timeline': {'total': 0},
            '_links': {'self': {'href': '/v1/store/307'}}
        },
            {
                'id': 308,
                'name': 'Store 2',
                'permission': {
                    'university': '*'
                },
                'order': {'total': 0},
                'timeline': {'total': 12},
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
                'timeline': {'total': 22},
                '_links': {'self': {'href': '/v1/store/307'}}
            }
        ]
    }
};

Observable.interval(6e4).subscribe(() => {
    aggregatedUserInfoMock._embedded.store.forEach((store, index) => {
        store.timeline.total = Math.floor(Math.random() * 9 + (index * 10));
    })
});
