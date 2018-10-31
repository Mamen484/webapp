import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer as observableTimer } from 'rxjs';
import { Store as AppStore } from '@ngrx/store';

import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment';
import { AggregatedUserInfo, PaymentType, Store, StoreStatus } from 'sfl-shared/src/lib/core/entities';
import { SflLocalStorageService, SflWindowRefService, SflUserService } from 'sfl-shared';
import { TimelineService } from '../core/services/timeline.service';
import { ActivatedRoute, Router } from '@angular/router';

const UPDATE_EVENTS_INTERVAL = 6e4;

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
    userInfo: AggregatedUserInfo;
    currentStore: Store;
    storeStatus = StoreStatus;
    newEvents = 0;
    isManager = false;
    paymentTypes = PaymentType;
    isAdmin = false;

    protected newEventsSubscription;


    constructor(protected appStore: AppStore<AppState>,
                protected windowRef: SflWindowRefService,
                protected localStorage: SflLocalStorageService,
                protected timelineService: TimelineService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected userService: SflUserService) {
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo().subscribe((userInfo) => {
            this.userInfo = userInfo;
            this.isManager = Boolean(this.userInfo.roles.find(role => role === 'manager'));
            this.isAdmin = userInfo.isAdmin();
        });
        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.newEventsSubscription = observableTimer(0, UPDATE_EVENTS_INTERVAL).subscribe(() => this.updateEventsNumber());
    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${environment.APP_URL}/index/logout`;
    }

    navigateToTimeline() {
        this.router.routeReuseStrategy.shouldDetach(this.route.snapshot);
        this.router.navigate(['/timeline']).then(data => {
            if (!data) {
                // user tries to load timeline route, that is active now, so we need to reload the timeline data
                this.timelineService.emitUpdatedTimeline();
            }
        });

    }

    protected updateEventsNumber() {
        this.timelineService.getUpdatesNumber()
            .subscribe(events => this.newEvents = events);
    }

    ngOnDestroy() {
        if (this.newEventsSubscription) {
            this.newEventsSubscription.unsubscribe();
        }
    }
}
