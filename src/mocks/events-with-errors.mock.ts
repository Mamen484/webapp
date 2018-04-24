export const eventsWithErrors = {
    total: 14,
    limit: 10,
    pages: 1,
    page: 1,
    count: 14,
    '_links': {
        'next': {'href': '/v1/store/307/timeline?name=rule.transformation%2C+rule.segmentation%2C+order.lifecycle\u0026page=2\u0026limit=10'},
    },
    _embedded: {
        timeline: [{
            id: '59d53a6d884e62000c78c309',
            name: 'rule.transformation',
            action: 'create',
            occurredAt: '2017-10-03T19:45:49+00:00',
            data: {'reference': 'sd3wwfd', 'name': 'some name'},
        }, {
            id: '59d53a6b884e62000c78c2fe',
            name: 'order.lifecycle',
            action: 'push',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {'reference': '59d53a6b2b26b'},
        }, {
            id: '59d53a6b884e62000c78c300',
            name: 'rule.segmentation',
            action: 'delete',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {'reference': '353433dfd', 'name': 'some name'},
        }, {
            id: 'import_no_data_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
        }, {
            id: 'import_categories_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'categories'}
        }, {
            id: 'import_products_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'products'}
        }, {
            id: 'import_open_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'open'}
        }, {
            id: 'export_marketplace_error',
            name: 'feed.export',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            _embedded: {
                channel: {
                    name: 'amazon',
                    type: 'marketplace'
                }
            }
        }, {
            id: 'export_ads_error',
            name: 'feed.export',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            _embedded: {
                channel: {
                    name: 'some_ad',
                    type: 'ads'
                }
            }
        }, {
            id: 'import_check_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'check'}
        }, {
            id: 'import_references_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'references'}
        }, {
            id: 'import_mapping_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'mapping'}
        }, {
            id: 'import_unknown_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'abracadabra'}
        }, {
            id: 'import_setting_error',
            name: 'feed.import',
            action: 'error',
            occurredAt: '2017-10-03T19:45:47+00:00',
            data: {reason: 'settings'}
        }, {
            id: 'export_cancelled_error',
            name: 'feed.export',
            action: 'cancel',
            occurredAt: '2017-10-03T19:45:47+00:00',
            _embedded: {
                channel: {
                    name: 'amazon',
                    type: 'marketplace'
                }
            }
        }
        ]
    }
};
