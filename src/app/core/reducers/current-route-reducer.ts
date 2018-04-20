export const SET_ROUTE = 'SET_ROUTE';

export function currentRouteReducer(state, {type, routeName}: { type: string, routeName: string }) {
    switch (type) {
        case SET_ROUTE:
            return routeName;

        default:
            return state;
    }

}
