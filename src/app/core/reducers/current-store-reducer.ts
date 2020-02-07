import { Store } from 'sfl-shared/entities';
import {cloneDeep} from 'lodash';

export const SET_STORE = 'SET_STORE';

export function currentStoreReducer(state, {type, store}: { type: string, store?: Store }) {
    switch (type) {

        case SET_STORE:
            return cloneDeep(store);

        default:
            return state;
    }
}
