import {cloneDeep} from 'lodash';
import { StoreChannelDetails } from 'sfl-shared/src/lib/core/entities';

export const SET_CHANNELS = 'SET_CHANNELS';

export function installedChannelsReducer(state, {type, channels}: { type: string, channels?: StoreChannelDetails[] }) {
    switch (type) {

        case SET_CHANNELS:
            return cloneDeep(channels);

        default:
            return state;
    }
}