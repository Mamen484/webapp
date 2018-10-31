import { ChannelStatistics } from 'sfl-shared/src/lib/core/entities';
import { storeChannelMock } from './store-channel.mock';

class ChannelMock implements ChannelStatistics {

    currency = Math.round((Math.random() * 10)) % 2 === 0 ? '$' : '€';
    'revenue' = +(Math.random() * 1000000).toFixed(0);
    'selected' = +(Math.random() * 10000000).toFixed(0);
    'exported' = +(Math.random() * 100000).toFixed(0);

    constructor(public name: string, public id: number) {

    }
}


export const statisticsMock = {
    'id': 109,
    'symbol': '$',
    'revenue': 20.9,
    'orders': 90000,
    'clicks': 22142200,
    'channels': storeChannelMock._embedded.storeChannel.map(ch => new ChannelMock(ch._embedded.channel.name, ch.id)),
    '_links': {
        'self': {
            'href': '/v1/stat/store/109'
        },
        'store': {
            'href': '/v1/store/109'
        }
    }
};
