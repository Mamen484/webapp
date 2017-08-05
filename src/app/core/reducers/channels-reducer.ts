import { StoreChannelResponse } from '../entities/store-channel-response';

export const SET_CHANNELS = 'SET_CHANNELS';

export function channelsReducer(state, {type, channels}: { type: string, channels: StoreChannelResponse }) {
    switch (type) {

        case SET_CHANNELS:
            return channels;
        default:
            return state;
    }
}
