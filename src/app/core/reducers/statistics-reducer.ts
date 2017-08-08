import { Statistics } from '../entities/statistics';

export const SET_STATISTICS = 'SET_STATISTICS';

export function statisticsReducer(state, {type, statistics}: { type: string, statistics?: Statistics }) {
    switch (type) {

        case SET_STATISTICS:
            return statistics;
        default:
            return state;
    }
}
