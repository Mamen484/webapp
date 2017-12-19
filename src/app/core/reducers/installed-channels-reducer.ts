import {cloneDeep} from 'lodash';
import { StoreChannelDetails } from '../entities/store-channel-details';

export const SET_CHANNELS = 'SET_CHANNELS';

export function installedChannelsReducer(state, {type, channels}: { type: string, channels?: StoreChannelDetails[] }) {
    switch (type) {

        case SET_CHANNELS:
            return cloneDeep(channels);

        default:
            return state;
    }
}