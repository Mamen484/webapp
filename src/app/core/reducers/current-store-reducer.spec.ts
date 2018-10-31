import { Store } from 'sfl-shared/src/lib/core/entities';
import { currentStoreReducer, SET_STORE } from './current-store-reducer';

describe('Current Store Reducer', () => {
    it('should return specified Store on SET_STORE action', () => {
        let data = <Store>{};
        expect(
            currentStoreReducer(null, {type: SET_STORE, store: data})
        ).toEqual(data);
    });

    it('should return the last state when no action is specified', () => {
        expect(currentStoreReducer('habracadabra', {type: ''})).toEqual('habracadabra');
    })
});
