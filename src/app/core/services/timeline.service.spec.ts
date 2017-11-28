import { TimelineService } from './timeline.service';
import { Observable } from 'rxjs/Observable';
import { Timeline } from '../entities/timeline';
import { TimelineUpdate } from '../entities/timeline-update';

let data = {
    'total': 29,
    'limit': 30,
    'pages': 1,
    'page': 1,
    'count': 29,
    '_embedded': {
        'timeline': [{
            'id': '59e0dcb1ae7b3b02694c3ff1',
            'name': 'feed.import',
            'action': 'finish',
        }, {
            'id': '59e0dcb2ae7b3b02694c3ff3',
            'name': 'feed.export',
            'action': 'ask',

            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0dcadae7b3b02685a4381',
            'name': 'feed.import',
            'action': 'start',
        }, {
            'id': '59e0dcaeae7b3b02685a4383',
            'name': 'feed.export',
            'action': 'finish',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0dc80ae7b3b02656ab2c1',
            'name': 'feed.import',
            'action': 'ask',
        }, {
            'id': '59e0dc80ae7b3b02656ab2c3',
            'name': 'feed.export',
            'action': 'start',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'Amazon',
                    'type': 'marketplaces',
                }
            }
        }, {
            'id': '59e0dc7bae7b3b026464d0b1',
            'name': 'feed.import',
            'action': 'finish',
            'occurredAt': '2017-10-13T15:32:09+00:00'
        }, {
            'id': '59e0dc7cae7b3b026464d0b3',
            'name': 'feed.export',
            'action': 'ask',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'Amazon',
                    'type': 'marketplaces',
                }
            }
        }, {
            'id': '59e0dc61ae7b3b02636d78a1',
            'name': 'feed.import',
            'action': 'ask',
        }, {
            'id': '59e0dc61ae7b3b02636d78a3',
            'name': 'feed.export',
            'action': 'ask',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0dc5dae7b3b026233bc91',
            'name': 'feed.import',
            'action': 'finish',
        }, {
            'id': '59e0dc5dae7b3b026233bc93',
            'name': 'feed.export',
            'action': 'finish',

            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0db4fae7b3b02612bf131',
            'name': 'feed.import',
            'action': 'start',
        }, {
            'id': '59e0db50ae7b3b02612bf133',
            'name': 'feed.export',
            'action': 'start',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0db23ae7b3b02601a7d21',
            'storeId': 307,
            'name': 'feed.import',
            'action': 'ask',
            'occurredAt': '2017-10-13T15:26:24+00:00',
        }, {
            'id': '59e0db23ae7b3b02601a7d23',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'ask',
            'occurredAt': '2017-10-13T15:26:24+00:00',

            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0db20ae7b3b025f4c42b1',
            'storeId': 307,
            'name': 'feed.import',
            'action': 'finish',
            'occurredAt': '2017-10-13T15:26:21+00:00',
        }, {
            'id': '59e0db20ae7b3b025f4c42b3',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'finish',
            'occurredAt': '2017-10-13T15:26:21+00:00',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0d225ae7b3b025e4d4a31',
            'storeId': 307,
            'name': 'feed.import',
            'action': 'start',
            'occurredAt': '2017-10-13T14:48:03+00:00',
        }, {
            'id': '59e0d225ae7b3b025e4d4a33',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'finish',
            'occurredAt': '2017-10-13T14:48:03+00:00',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0d221ae7b3b025d55c201',
            'name': 'feed.import',
            'action': 'finish',
            'occurredAt': '2017-10-13T14:47:58+00:00',
        }, {
            'id': '59e0d222ae7b3b025d55c203',
            'name': 'feed.export',
            'action': 'ask',
            'occurredAt': '2017-10-13T14:47:58+00:00',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        }, {
            'id': '59e0d0f5ae7b3b025c57c2b1',
            'storeId': 307,
            'name': 'feed.import',
            'action': 'start',
            'occurredAt': '2017-10-13T14:42:57+00:00',
        }, {
            'id': '59e0d0f5ae7b3b025c57c2b3',
            'storeId': 307,
            'name': 'feed.export',
            'action': 'start',
            'occurredAt': '2017-10-13T14:42:57+00:00',
            '_embedded': {
                'channel': {
                    'id': 66,
                    'name': 'SmartFeed',
                    'type': 'ads',
                }
            }
        },
            {
                'id': '59e0d0f5ae7b3b025c57c2b5',
                'storeId': 307,
                'name': 'feed.import',
                'action': 'error',
                'occurredAt': '2017-10-13T14:42:57+00:00',
            },{
                'id': '59e0d0f5ae7b3b025c57c2b4',
                'storeId': 307,
                'name': 'feed.import',
                'action': 'ask',
                'occurredAt': '2017-10-13T14:42:57+00:00',
            },
            {
                'id': '59e0d0f5ae7b3b025c57c2b8',
                'storeId': 307,
                'name': 'feed.export',
                'action': 'error',
                'occurredAt': '2017-10-13T14:42:57+00:00',
                '_embedded': {
                    'channel': {
                        'id': 66,
                        'name': 'SmartFeed',
                        'type': 'ads',
                    }
                }
            },
            {
                'id': '59e0d0f5ae7b3b025c57c2b7',
                'storeId': 307,
                'name': 'feed.export',
                'action': 'start',
                'occurredAt': '2017-10-13T14:42:57+00:00',
                '_embedded': {
                    'channel': {
                        'id': 66,
                        'name': 'SmartFeed',
                        'type': 'ads',
                    }
                }
            },
            {
                'id': '59e0d0f5ae7b3b025c57c2b6',
                'storeId': 307,
                'name': 'feed.export',
                'action': 'ask',
                'occurredAt': '2017-10-13T14:42:57+00:00',
                '_embedded': {
                    'channel': {
                        'id': 66,
                        'name': 'SmartFeed',
                        'type': 'ads',
                    }
                }
            }
        ]
    }
};

describe('TimelineService', () => {

    let service;
    beforeEach(() => {
        service = new TimelineService(<any>{get: () => Observable.of(data)});
    });

    it ('tyrypyry', () => {
        service.getEventUpdates(307).subscribe((updates: Timeline<TimelineUpdate>) => {
            let upd = updates._embedded.timeline;
            expect(upd[0].id).toEqual('59e0dcb1ae7b3b02694c3ff1');
            expect(upd[1].id).toEqual('59e0dcb2ae7b3b02694c3ff3');
            expect(upd[2].id).toEqual('59e0dcaeae7b3b02685a4383');
            expect(upd[3].id).toEqual('59e0dc80ae7b3b02656ab2c3');
            expect(upd[4].id).toEqual('59e0dc7bae7b3b026464d0b1');
            expect(upd[5].id).toEqual('59e0dc5dae7b3b026233bc91');
            expect(upd[6].id).toEqual('59e0dc5dae7b3b026233bc93');
            expect(upd[7].id).toEqual('59e0db20ae7b3b025f4c42b1');
            expect(upd[8].id).toEqual('59e0db20ae7b3b025f4c42b3');
            expect(upd[9].id).toEqual('59e0d225ae7b3b025e4d4a33');
            expect(upd[10].id).toEqual('59e0d221ae7b3b025d55c201');
            expect(upd[11].id).toEqual('59e0d0f5ae7b3b025c57c2b3');
            expect(upd[12].id).toEqual('59e0d0f5ae7b3b025c57c2b5');
            expect(upd[13].id).toEqual('59e0d0f5ae7b3b025c57c2b8');
            expect(upd.length).toEqual(14);
        });
    });
});