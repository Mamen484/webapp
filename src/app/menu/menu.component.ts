import { Component, OnDestroy } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';

import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { Store } from '../core/entities/store';
import { SET_STORE } from '../core/reducers/current-store-reducer';
import { WindowRefService } from '../core/services/window-ref.service';
import { StoreStatus } from '../core/entities/store-status.enum';
import { LocalStorageService } from '../core/services/local-storage.service';
import { TimelineService } from '../core/services/timeline.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const UPDATE_EVENTS_INTERVAL = 6e4;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    storeStatus = StoreStatus;
    appUrl = environment.APP_URL;
    newEvents = 0;

    protected newEventsSubscription;


    constructor(protected appStore: AppStore<AppState>,
                protected windowRef: WindowRefService,
                protected localStorage: LocalStorageService,
                protected timelineService: TimelineService,
                protected route: ActivatedRoute,
                protected router: Router) {
        this.appStore.select('userInfo').subscribe(userInfo => this.userInfo = userInfo);
        this.appStore.select('currentStore').subscribe(currentStore => {
            this.currentStore = currentStore;
            this.updateEvents();
        });
        this.newEventsSubscription = Observable.timer(0, UPDATE_EVENTS_INTERVAL).subscribe(() => this.updateEvents());
    }

    chooseStore(store) {
        this.appStore.select('currentStore').dispatch({type: SET_STORE, store});
    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${this.appUrl}/index/logout`;
    }

    isAdmin() {
        return this.userInfo.roles.find(role => role === 'admin');
    }

    navigateToTimeline() {
        this.router.routeReuseStrategy.shouldDetach(this.route.snapshot);
        this.router.navigate(['/timeline']).then(data => {
            if (!data) {
                // user tries to load timeline route, that is active now, so we need to reload the timeline data
                this.timelineService.emitUpdatedTimeline(this.currentStore.id);
            }
        });

    }

    protected updateEvents() {
        this.timelineService.getUpdatesNumber(this.currentStore.id)
            .subscribe(events => this.newEvents = events);
    }

    ngOnDestroy() {
        if (this.newEventsSubscription) {
            this.newEventsSubscription.unsubscribe();
        }
    }
}
