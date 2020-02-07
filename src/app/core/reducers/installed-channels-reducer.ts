import { cloneDeep } from 'lodash';
import { StoreChannel } from 'sfl-shared/entities';

export const SET_CHANNELS = 'SET_CHANNELS';

export function installedChannelsReducer(state, {type, channels}: { type: string, channels?: StoreChannel[] }) {
    switch (type) {
        case SET_CHANNELS:
            return cloneDeep(channels);

        default:
            return state;
    }
}
