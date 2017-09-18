import { channelsReducer, SET_CHANNELS } from './channels-reducer';
import { StoreChannelResponse } from '../entities/store-channel-response';

describe('Channels Reducer', () => {
    it('should return specified StoreChannelResponse on SET_CHANNELS action', () => {
        let response = <StoreChannelResponse>{};
        expect(
            channelsReducer(null, {type: SET_CHANNELS, channels: response})
        ).toEqual(response);
    });


    it('should return the last state when no action is specified', () => {
        expect(channelsReducer('habracadabra', {type: ''})).toEqual('habracadabra');
    })
});
