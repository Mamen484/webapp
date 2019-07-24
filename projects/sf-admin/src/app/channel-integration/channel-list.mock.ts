export const channelsList = {
    total: 4,
    limit: 10,
    pages: 1,
    page: 1,
    count: 4,
    _embedded: {
        permission: [
            {
                id: 1,
                accounId: 1,
                channelId: 1,
                allow: [],
                _embedded: {
                    account: {name: 'Some account 1'},
                    channel: {name: 'Some channel 1', lastModifiedAt: '2018-04-03T12:26:21+00:00', active: true}
                }
            },
            {
                id: 2,
                accounId: 1,
                channelId: 2,
                allow: [],
                _embedded: {
                    account: {name: 'Some account 1'},
                    channel: {name: 'Some channel 2', lastModifiedAt: '2018-04-04T12:26:21+00:00', active: false}
                }
            },
            {
                id: 3,
                accounId: 2,
                channelId: 1,
                allow: [],
                _embedded: {
                    account: {name: 'Some account 2'},
                    channel: {name: 'Some channel 1', lastModifiedAt: '2018-04-03T12:26:21+00:00', active: false}
                }
            },
            {
                id: 4,
                accounId: 3,
                channelId: 4,
                allow: [],
                _embedded: {
                    account: {name: 'Some account 3'},
                    channel: {name: 'Some channel 4', lastModifiedAt: '2019-02-05T12:26:21+00:00', active: true}
                }
            }
        ]
    }
};
