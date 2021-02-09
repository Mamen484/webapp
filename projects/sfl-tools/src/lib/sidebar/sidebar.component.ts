import { Component, Inject, Input, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { SFL_LEGACY_LINK, Store as UserStore } from 'sfl-shared/entities';
import { SflAuthService, SflUserService, SflWindowRefService, SupportLinkService, TimelineService } from 'sfl-shared/services';
import { timer } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

const UPDATE_EVENTS_INTERVAL = 6e4;

@Component({
    selector: 'sft-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SftSidebarComponent implements OnInit, OnDestroy {

    @Input() position = 'sticky';
    @Input() linkRef: TemplateRef<any>;
    currentRoute = {menuName: 'homepage', pageName: 'homepage'};
    currentStore: UserStore;
    stores: UserStore[];
    contentShown = true;

    // listen until page loads to prevent animation on page load

    linkToSupportCenter;
    newEvents = 0;

    // prevent animation on page load
    animationEnabled = false;
    protected newEventsSubscription;

    constructor(private windowRef: SflWindowRefService,
                private supportLinkService: SupportLinkService,
                private timelineService: TimelineService,
                private authService: SflAuthService,
                public sidebarService: SidebarService,
                private appStore: Store<any>,
                private userService: SflUserService,
                private renderer: Renderer2,
                @Inject(SFL_LEGACY_LINK) private legacyLink) {

        this.linkToSupportCenter = this.supportLinkService.supportLink;
    }

    ngOnInit() {
        this.newEventsSubscription = timer(0, UPDATE_EVENTS_INTERVAL).subscribe(() => this.updateEventsNumber());
        this.appStore.select('currentRoute').pipe(filter((route) => route && typeof route === 'object')).subscribe(currentRoute => {
            this.currentRoute = currentRoute;
        });
        this.appStore.select('currentStore').subscribe(currentStore => this.currentStore = currentStore);
        this.userService.fetchAggregatedInfo().subscribe(info => this.stores = info._embedded.store.slice(0, 5));
    }


    ngOnDestroy() {
        if (this.newEventsSubscription) {
            this.newEventsSubscription.unsubscribe();
        }
    }

    logout() {
        this.authService.logout();
    }

    hideSidebar() {
        if (!this.animationEnabled){
            this.renderer.addClass(document.body, 'sf-sidebar-animation-enabled');
            this.animationEnabled = true;
        }

        this.contentShown = false;
        this.renderer.addClass(document.body, 'sf-sidebar-collapsed');
    }

    showSidebar() {
        this.contentShown = true;
        this.renderer.removeClass(document.body, 'sf-sidebar-collapsed');
    }

    protected updateEventsNumber() {
        this.timelineService.getUpdatesNumber()
            .subscribe(events => this.newEvents = events);
    }
}

@Component({
    selector: 'sft-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SftSidebarWebComponent extends SftSidebarComponent {
}
