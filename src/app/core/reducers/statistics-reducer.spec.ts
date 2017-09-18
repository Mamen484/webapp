import { Statistics } from '../entities/statistics';
import { SET_STATISTICS, statisticsReducer } from './statistics-reducer';

describe('Statistics Reducer', () => {
    it('should return specified Statistics response on SET_STATISTICS action', () => {
        let data = <Statistics>{};
        expect(
            statisticsReducer(null, {type: SET_STATISTICS, statistics: data})
        ).toEqual(data);
    });

    it('should return the last state when no action is specified', () => {
        expect(statisticsReducer('habracadabra', {type: ''})).toEqual('habracadabra');
    })
});
