import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { SET_ROUTE } from 'sfl-shared/reducers';

@Injectable({
    providedIn: 'root',
})
export class HomepageRouteGuard implements CanActivate {
    constructor(protected appStore: Store<AppState>) {
    }

    canActivate(): true {
        this.appStore.dispatch({type: SET_ROUTE, routeName: 'homepage'});
        return true;
    }
}
