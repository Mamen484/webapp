import { Component, Input, OnInit } from '@angular/core';
import {
    ActivatedRoute,
    ActivationEnd,
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';
import { merge } from 'rxjs';
import { SflToggleSidebarService } from '../core/toggle-sidebar.service';

export const DEFAULT_MENU_BACKGROUND = '#072343';

@Component({
    selector: 'sfl-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {
    @Input() backgroundColor = DEFAULT_MENU_BACKGROUND;
    @Input() enableMenuIcon = true;
    loadingNextRoute = false;

    /**
     * contains false if we don't need to show 'back to login' button,
     * otherwise contains a route to follow after click on 'back' button
     */
    showBackButton?: any[];

    constructor(protected toggleSidebarService: SflToggleSidebarService,
                protected route: ActivatedRoute,
                protected router: Router) {
        this.router.events.subscribe(routerEvent => this.checkRouterEvent(routerEvent));
    }

    ngOnInit() {
        // initialize 'back in history' button
        merge(...this.getAllChildrenData())
            .subscribe(({showBackButton}) => {
                if (showBackButton) {
                    this.showBackButton = showBackButton
                }
            });
        // add/remove 'back in history' button when change a route depending on backInHistory route data property
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.showBackButton = undefined;
            }
            if (event instanceof ActivationEnd) {
                if (event.snapshot.data.showBackButton) {
                    this.showBackButton = event.snapshot.data.showBackButton;
                }
            }
        });

    }

    toggleSidebar() {
        this.toggleSidebarService.toggleSidebar();
    }

    followBackButton() {
        this.router.navigate(this.showBackButton);
    }

    getAllChildrenData() {
        let route = this.route;
        let dataArray = [];
        while (route) {
            dataArray.push(route.data);
            route = route.firstChild;
        }
        return dataArray;
    }

    /**
     * Show a progressbar in the top of the application when we're loading the next route
     */
    checkRouterEvent(routerEvent: Event) {
        if (routerEvent instanceof NavigationStart) {
            this.loadingNextRoute = true;
        }
        if (routerEvent instanceof NavigationEnd
            || routerEvent instanceof NavigationCancel
            || routerEvent instanceof NavigationError) {
            this.loadingNextRoute = false;
        }
    }
}
