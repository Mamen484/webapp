import { AggregatedUserInfo } from 'sfl-shared/src/lib/core/entities';

export const INITIALIZE_USER_INFO = 'INITIALIZE_USER_INFO';

export function userInfoReducer(state, {type, userInfo}: { type: string, userInfo?: AggregatedUserInfo }) {
    switch (type) {

        case INITIALIZE_USER_INFO:
            return userInfo;
        default:
            return state;
    }
}
