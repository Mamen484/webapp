export const acknowledgmentErrorsResponse = {
    'total': 2,
    'limit': 5,
    'pages': 1,
    'page': 1,
    'count': 2,
    '_links': {
    },
    '_embedded': {
        'order': [{
            'reference': '11',
            '_embedded': {
                'channel': {
                    'id': 1,
                    'name': 'Amazon',
                }
            }
        }, {
            'reference': '12',
            '_embedded': {
                'channel': {
                    'id': 2,
                    'name': 'Ebay',
                }
            }
        }]
    }
};
