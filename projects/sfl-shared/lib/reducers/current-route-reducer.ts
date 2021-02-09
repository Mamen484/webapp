export const SET_ROUTE = 'SET_ROUTE';

export function currentRouteReducer(state, {type, route, routeName}:
    { type: string, route?: { menuName: string, pageName: string }, routeName?: string }) {
    switch (type) {
        case SET_ROUTE:
            return route ?? {menuName: routeName, pageName: routeName};

        default:
            return state;
    }

}
