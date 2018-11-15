import { StoreChannel } from 'sfl-shared/entities';
import { Channel } from 'sfl-shared/entities';

const channelsMock = {
    '_links': {'self': {'href': '/v1/channel'}},
    '_embedded': {
        'channel': [
            {
                'id': 0,
                'store': 45,
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': true,
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
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon136',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon177',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon62',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon202',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon49',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon84',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon226',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon179',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon131',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon73',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon196',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon170',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon3',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon71',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon174',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon65',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon290',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon125',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon67',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'nursery',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon172',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'homeAndGarden',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon198',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'homeAndGarden',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon178',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'toys',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon248',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'highTech',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon236',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon254',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'appliances',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon71',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'gastronomy',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon83',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'appliances',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon221',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'organic',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon290',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'organic',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon206',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon252',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'motors',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon54',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon127',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon150',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon153',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon6',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'professional',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon296',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon201',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon94',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon136',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon81',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon257',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon90',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon152',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon239',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon267',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon96',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon254',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon262',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon202',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon271',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon60',
                'installed': false,
                'description': 'Some two-line description of the channel',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon197',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon274',
                'installed': false,
                'description': 'Some short description',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon284',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon173',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon272',
                'installed': false,
                'description': 'Some very very long description that takes a lot of lines to make sure that it turns to ellipsis not to overflow the text below',
                'type': 'marketplace',
                'segment': 'everything',
                'offer': 'http://example.fr',
                'countries': [],
                '_links': {'self': {'href': '/v1/channel/456'}, 'image': {'href': '/amazon.jpg'}}
            }, {
                'id': 456,
                'name': 'amazon100',
                'installed': false,
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
            switch (channel.installed) {
                case true:
                    return (<StoreChannel>channel)._embedded.channel.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;

                default:
                    return (<Channel>channel).name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
            }
        })
        // filter by segment
        .filter(channel => {
            return segment === '' || !channel.installed && (<Channel>channel).segment === segment;
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
