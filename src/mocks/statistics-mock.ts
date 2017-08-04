import { ChannelStatistics } from '../app/core/channel-statistics';

class ChannelMock implements ChannelStatistics {

    'symbol' = Math.round((Math.random() * 10)) % 2 === 0 ? '$' : '€';
    'revenue' = +(Math.random() * 1000000).toFixed(0);
    'selected' = +(Math.random() * 10000000).toFixed(0);
    'exported' = +(Math.random() * 100000).toFixed(0);

    constructor(public name: string) {

    }
}


export const statisticsMock = {
    'id': 109,
    'symbol': '$',
    'revenue': 20.9,
    'orders': 90000,
    'clicks': 22142200,
    'channels': [
        new ChannelMock('amazon'),
        new ChannelMock('amazon1'),
        new ChannelMock('amazon2'),
        new ChannelMock('amazon3'),
        new ChannelMock('amazon4'),
        new ChannelMock('amazon5'),
        new ChannelMock('amazon6'),
        new ChannelMock('amazon7'),
        new ChannelMock('amazon8'),
        new ChannelMock('amazon9'),
        new ChannelMock('amazon10'),
    ],
    '_links': {
        'self': {
            'href': '/v1/stat/store/109'
        },
        'store': {
            'href': '/v1/store/109'
        }
    }
};
