import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { INITIALIZE_USER_INFO, userInfoReducer } from './user-info-reducer';

describe('UserInfo Reducer', () => {
    it('should return specified Statistics response on INITIALIZE_USER_INFO action', () => {
        let data = <AggregatedUserInfo>{};
        expect(
            userInfoReducer(null, {type: INITIALIZE_USER_INFO, userInfo: data})
        ).toEqual(data);
    });

    it('should return the last state when no action is specified', () => {
        expect(userInfoReducer('habracadabra', {type: ''})).toEqual('habracadabra');
    })
});
