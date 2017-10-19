export const fetchStoresMock = {
    '_links': {
        'self': {
            'href': '/v1/store'
        }
    },
    '_embedded': {
        'store': [
            {
                'id': 10054,
                'name': 'Top Wagen',
            },
            {
                'id': 2866,
                'name': 'Sportsdepot',
            },
            {
                'id': 47,
                'name': 'CoindugeekSG9m',
            }
        ]
    },
    'total': 100,
    'limit': 10,
    'pages': 1,
    'page': 1,
    'count': 3
};