import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { SET_ROUTE } from 'sfl-shared/reducers';
import { SftMenuTab } from 'sfl-tools/src/lib/menu-tabs';

@Injectable({
    providedIn: 'root'
})
export class ConnectedChannelsGuard implements CanActivate {
    constructor(private store: Store<AppState>) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        this.store.dispatch({type: SET_ROUTE, route: {menuName: 'channels', pageName: SftMenuTab.connectedChannels}})
        return true;
    }


}
