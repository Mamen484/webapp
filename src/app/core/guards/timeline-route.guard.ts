import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_ROUTE } from '../reducers/current-route-reducer';

@Injectable()
export class TimelineRouteGuard implements CanActivate {
    constructor(protected appStore: Store<AppState>) {
    }

    canActivate(): true {
        this.appStore.dispatch({type: SET_ROUTE, routeName: 'timeline'});
        return true;
    }
}
