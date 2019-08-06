export const channelsList = {
    total: 4,
    limit: 10,
    pages: 1,
    page: 1,
    count: 4,
    _embedded: {
        channel: [
            {
                id: 1,
                name: 'Some channel 1',
                permission: [
                    {
                        account: {
                            id: 1,
                            name: 'Some account 1'
                        },
                        allow: [
                            'edit'
                        ]
                    }
                ],
                published: true,
                lastModifiedAt: '2018-04-03T12:26:21+00:00'
            },
            {
                id: 2,
                name: 'Some channel 2',
                permission: [
                    {
                        account: {
                            id: 1,
                            name: 'Some account 1'
                        },
                        allow: [
                            'edit'
                        ]
                    },
                    {
                        account: {
                            id: 5,
                            name: 'Some account 5'
                        },
                        allow: [
                            'edit'
                        ]
                    },
                    {
                        account: {
                            id: 10,
                            name: 'Some account 10'
                        },
                        allow: [
                            'edit'
                        ]
                    }
                ],
                published: false,
                lastModifiedAt: '2018-04-03T12:26:21+00:00'
            },
            {
                id: 3,
                name: 'Some channel 3',
                permission: [
                    {
                        account: {
                            id: 2,
                            name: 'Some account 2'
                        },
                        allow: [
                            'edit'
                        ]
                    }
                ],
                published: false,
                lastModifiedAt: '2018-04-03T12:26:21+00:00'
            },
            {
                id: 4,
                name: 'Some channel 4',
                permission: [
                    {
                        account: {
                            id: 3,
                            name: 'Some account 3'
                        },
                        allow: [
                            'edit'
                        ]
                    }
                ],
                published: true,
                lastModifiedAt: '2018-04-03T12:26:21+00:00'
            }
        ]
    }
};
