import { StoreChannel } from '../app/core/entities/store-channel';
import { Channel } from '../app/core/entities/channel';

const channelsMock = {
    '_links': {'self': {'href': '/v1/channel'}},
    '_embedded': {
        'channel': [
            {
                'id': 0,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon0',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 1,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'ebay',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/ebay.png'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 2,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon2',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/googleshopping.png'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 3,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon3',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/cdiscount.png'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 4,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon4',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/etsy.png'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 5,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon5',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 6,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon6',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 7,
                'isConfigured': true,
                'store': 45,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon7',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 8,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon8',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            }, {
                'id': 9,
                'store': 45,
                'isConfigured': true,
                'channel': 789,
                '_embedded': {
                    'channel': {
                        'name': 'amazon9',
                        '_links': {'self': {'href': '/v1/channel/1'}, 'image': {'href': '/amazon.jpg'}}
                    }
                },
                '_links': {'self': {'href': '/v1/storechannel/123'}}
            },
            {
                'id': 456,
                'name': 'amazon167',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon136',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon177',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon62',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon202',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon49',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon84',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon226',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon179',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon131',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon73',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon196',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon170',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon3',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon71',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon174',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon65',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon290',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon125',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon67',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'nursery',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon172',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'homeAndGarden',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon198',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'homeAndGarden',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon178',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'toys',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon248',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'highTech',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon236',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon254',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'appliances',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon71',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'gastronomy',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon83',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'appliances',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon221',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'organic',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon290',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'organic',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon206',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon252',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'motors',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon54',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon127',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon150',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon153',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon6',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon296',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon201',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon94',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon136',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon81',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon257',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon90',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon152',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon239',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon267',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon96',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon254',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon262',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon202',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon271',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon60',
                'isConfigured': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon197',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon274',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon284',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon173',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon272',
                'isConfigured': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon100',
                'isConfigured': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }]
    }
};

export const channelsStaticMock = function ({page, limit, searchQuery, segment}) {
    let channels = channelsMock._embedded.channel
    // filter by name
        .filter(channel => {
            switch (channel.isConfigured) {
                case true:
                    return (<StoreChannel>channel)._embedded.channel.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;

                default:
                    return (<Channel>channel).name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
            }
        })
        // filter by segment
        .filter(channel => {
            return segment === '' || !channel.isConfigured && (<Channel>channel).segment === segment;
        });

    let total = channels.length;
    let pages = Math.floor(total / limit);
    let mock = Object.assign({}, channelsMock, {
        page,
        total,
        limit,
        pages,
        count: page < pages ? limit : total % limit
    });

    mock._embedded = {channel: []};

    for (let i = (page - 1) * limit; i < (page - 1) * limit + mock.count; i++) {
        mock._embedded.channel.push(channels[i]);
    }

    return mock;
};
