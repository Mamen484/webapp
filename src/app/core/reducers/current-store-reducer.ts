import { Store } from '../entities/store';

export const SET_STORE = 'SET_STORE';

export function currentStoreReducer(state, {type, store}: { type: string, store?: Store }) {
    switch (type) {

        case SET_STORE:
            return store;
        default:
            return state;
    }
}