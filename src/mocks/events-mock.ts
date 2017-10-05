export const events = {
    'total': 19,
    'limit': 10,
    'pages': 2,
    'page': 1,
    'count': 10,
    '_links': {
        'self': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=1\u0026limit=10'},
        'next': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=2\u0026limit=10'},
        'first': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=1\u0026limit=10'},
        'last': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=4\u0026limit=10'}
    },
    '_embedded': {
        'timeline': [{
            'id': '59d53a6d884e62000c78c309',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'create',
            'occurredAt': '2017-10-03T19:45:49+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6d884e62000c78c309'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6c884e62000c78c304',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'create',
            'occurredAt': '2017-10-03T19:45:48+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6c884e62000c78c304'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6b884e62000c78c2fe',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'push',
            'occurredAt': '2017-10-03T19:45:47+00:00',
            'data': {'reference': '59d53a6b2b26b'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6b884e62000c78c2fe'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6b884e62000c78c300',
            'storeId': 307,
            'name': 'rule.segmentation',
            'action': 'delete',
            'occurredAt': '2017-10-03T19:45:47+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6b884e62000c78c300'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6a884e62000c78c2f9',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'ship',
            'occurredAt': '2017-10-03T19:45:46+00:00',
            'data': {'reference': '59d53a6a277d8'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6a884e62000c78c2f9'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6a884e62000c78c2fa',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'delete',
            'occurredAt': '2017-10-02T19:45:46+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6a884e62000c78c2fa'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6a884e62000c78c2fb',
            'storeId': 307,
            'name': 'rule.segmentation',
            'action': 'create',
            'occurredAt': '2017-10-02T19:45:46+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6a884e62000c78c2fb'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a3f884e62000a4f8be9',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'push',
            'occurredAt': '2017-10-02T19:45:03+00:00',
            'data': {'reference': '59d53a3f8fc94'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a3f884e62000a4f8be9'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a3f884e62000a4f8beb',
            'storeId': 307,
            'name': 'rule.segmentation',
            'action': 'delete',
            'occurredAt': '2017-10-02T19:45:03+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a3f884e62000a4f8beb'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a3f884e62000a4f8be4',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'ship',
            'occurredAt': '2017-10-02T19:45:02+00:00',
            'data': {'reference': '59d53a3edc32a'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a3f884e62000a4f8be4'},
                'store': {'href': '/v1/store/307'}
            }
        }]
    }
}
export const events2 = {
    'total': 19,
    'limit': 10,
    'pages': 2,
    'page': 2,
    'count': 9,
    '_links': {
        'self': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=2\u0026limit=10'},
        'prev': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=1\u0026limit=10'},
        'first': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=1\u0026limit=10'},
        'last': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=2\u0026limit=10'}
    },
    '_embedded': {
        'timeline': [{
            'id': '59d53a3f884e62000a4f8be6',
            'storeId': 307,
            'name': 'rule.segmentation',
            'action': 'update',
            'occurredAt': '2017-10-03T19:45:02+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a3f884e62000a4f8be6'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a36884e6200093fcd25',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'update',
            'occurredAt': '2017-10-03T19:44:53+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a36884e6200093fcd25'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d539a6884e6200080a7f64',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'ship',
            'occurredAt': '2017-10-03T19:42:30+00:00',
            'data': {'reference': '59d539a60f738'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d539a6884e6200080a7f64'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d4f331884e6200070a4af6',
            'storeId': 307,
            'name': 'rule.segmentation',
            'action': 'create',
            'occurredAt': '2017-10-03T14:41:51+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d4f331884e6200070a4af6'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d4ecf3884e6200061639b5',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'delete',
            'occurredAt': '2017-10-03T14:15:12+00:00',
            'data': {'reference': null, 'name': null},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d4ecf3884e6200061639b5'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6d884e62000c78c308',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'ship',
            'occurredAt': '2017-10-02T19:45:49+00:00',
            'data': {'reference': '59d53a6d353c3'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6d884e62000c78c308'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6c884e62000c78c303',
            'storeId': 307,
            'name': 'order.lifecycle',
            'action': 'ship',
            'occurredAt': '2017-10-02T19:45:48+00:00',
            'data': {'reference': '59d53a6c2f802'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6c884e62000c78c303'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a6b884e62000c78c2ff',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'update',
            'occurredAt': '2017-10-02T19:45:47+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a6b884e62000c78c2ff'},
                'store': {'href': '/v1/store/307'}
            }
        }, {
            'id': '59d53a69884e62000c78c2f5',
            'storeId': 307,
            'name': 'rule.transformation',
            'action': 'update',
            'occurredAt': '2017-10-02T19:45:44+00:00',
            'data': {'reference': null, 'name': 'some name'},
            '_links': {
                'self': {'href': '/v1/store/307/timeline/59d53a69884e62000c78c2f5'},
                'store': {'href': '/v1/store/307'}
            }
        }]
    }
}