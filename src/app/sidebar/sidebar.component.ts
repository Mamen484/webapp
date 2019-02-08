import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { AggregatedUserInfo, Channel, PaymentType, Store, StoreChannelDetails, StoreStatus } from 'sfl-shared/entities';
import { SflLocalStorageService, SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { SupportLinkService } from '../core/services/support-link.service';
import { MediaObserver } from '@angular/flex-layout';
import { TimelineService } from '../core/services/timeline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { environment } from '../../environments/environment';

const UPDATE_EVENTS_INTERVAL = 6e4;

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    @Input() showExtendedSidenav = false;

    currentStore: Store;
    currentRoute;
    channels: StoreChannelDetails[];
    linkToSupportCenter;
    hideTooltips = false;

    userInfo: AggregatedUserInfo;
    storeStatus = StoreStatus;
    newEvents = 0;
    isManager = false;
    paymentTypes = PaymentType;
    isAdmin = false;

    protected newEventsSubscription;

    constructor(protected appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected windowRef: SflWindowRefService,
                protected localStorage: SflLocalStorageService,
                protected supportLinkService: SupportLinkService,
                protected media: MediaObserver,
                protected timelineService: TimelineService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected userService: SflUserService) {
        this.appStore.select('currentStore').subscribe((store: Store) => {
            this.currentStore = store;
        });
        this.appStore.select('installedChannels').subscribe(channels => this.channels = channels);
        this.appStore.select('currentRoute').subscribe(currentRoute => this.currentRoute = currentRoute);

        this.linkToSupportCenter = this.supportLinkService.supportLink;
        this.media.media$.subscribe(() => this.hideTooltips = this.media.isActive('xs'));
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo().subscribe((userInfo) => {
            this.userInfo = userInfo;
            this.isManager = Boolean(this.userInfo.roles.find(role => role === 'manager'));
            this.isAdmin = userInfo.isAdmin();
        });
        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.newEventsSubscription = timer(0, UPDATE_EVENTS_INTERVAL).subscribe(() => this.updateEventsNumber());
    }

    hasChannelsPermissions() {
        return this.currentStore.permission.ads
            || this.currentStore.permission.affiliation
            || this.currentStore.permission.marketplaces
            || this.currentStore.permission.retargeting
            || this.currentStore.permission.shopbots
            || this.currentStore.permission.solomo;
    }

    getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    onMenuOpen() {
        let menuElement = <HTMLDivElement>this.windowRef.nativeWindow.document.querySelector('.sf-sidebar-menu');
        menuElement.style.maxHeight = this.windowRef.nativeWindow.innerHeight - menuElement.getBoundingClientRect().top + 'px'
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

    logout() {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${environment.APP_URL}/index/logout`;
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
