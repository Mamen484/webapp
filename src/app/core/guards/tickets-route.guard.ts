import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_ROUTE } from '../reducers/current-route-reducer';

@Injectable({
    providedIn: 'root',
})
export class TicketsRouteGuard implements CanActivate {
    constructor(protected appStore: Store<AppState>) {

    }

    canActivate(): true {
        this.appStore.dispatch({type: SET_ROUTE, routeName: 'api'});
        return true;
    }
}
