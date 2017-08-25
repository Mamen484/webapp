import { Store } from '../entities/store';
import {cloneDeep} from 'lodash';

export const SET_STORE = 'SET_STORE';
export const UPDATE_TIMELINE = 'UPDATE_TIMELINE';

export function currentStoreReducer(state, {type, store, timelineEvents}: { type: string, store?: Store, timelineEvents?: number }) {
    switch (type) {

        case SET_STORE:
            return cloneDeep(store);

        case UPDATE_TIMELINE:
            if (timelineEvents !== state.timeline.total) {
                let storeCopy = cloneDeep(state);
                storeCopy.timeline.total = timelineEvents;
                return storeCopy;
            }
            return state;

        default:
            return state;
    }
}