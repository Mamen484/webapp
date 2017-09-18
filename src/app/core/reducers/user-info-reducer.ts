import { AggregatedUserInfo } from '../entities/aggregated-user-info';

export const INITIALIZE_USER_INFO = 'INITIALIZE';

export function userInfoReducer(state, {type, userInfo}: { type: string, userInfo: AggregatedUserInfo }) {
    switch (type) {

        case INITIALIZE_USER_INFO:
            return userInfo;
        default:
            return state;
    }
}
