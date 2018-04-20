import { Component, Input, OnInit } from '@angular/core';
import { LoadingFlagService } from '../core/services/loading-flag.service';
import { ToggleSidebarService } from '../core/services/toggle-sidebar.service';
import { ActivatedRoute, ActivationEnd, NavigationStart, Router } from '@angular/router';
import { merge } from 'rxjs/observable/merge';

export const DEFAULT_MENU_BACKGROUND = '#072343';

@Component({
    selector: 'sf-menu-container',
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
     *
     * @type {boolean | string}
     */
    showBackButton?: any[];

    constructor(protected loadingFlagService: LoadingFlagService,
                protected toggleSidebarService: ToggleSidebarService,
                protected route: ActivatedRoute,
                protected router: Router) {
        this.loadingFlagService.isLoading().subscribe(isLoading => this.loadingNextRoute = isLoading);
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
}
