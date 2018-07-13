import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_ROUTE } from '../reducers/current-route-reducer';

@Injectable()
export class OrdersRouteGuard implements CanLoad {
    constructor(protected appStore: Store<AppState>) {

    }

    canLoad(): true {
        this.appStore.select('currentRoute').dispatch({type: SET_ROUTE, routeName: 'orders'});
        return true;
    }
}
