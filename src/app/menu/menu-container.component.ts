import { Component, Input, OnInit } from '@angular/core';
import { ToggleSidebarService } from '../core/services/toggle-sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';

export const DEFAULT_MENU_BACKGROUND = '#072343';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {
    @Input() backgroundColor = DEFAULT_MENU_BACKGROUND;
    @Input() enableMenuIcon = true;

    /**
     * contains false if we don't need to show 'back to login' button,
     * otherwise contains a route to follow after click on 'back' button
     *
     * @type {boolean | string}
     */
    showBackButton?: any[];

    constructor(protected toggleSidebarService: ToggleSidebarService, protected route: ActivatedRoute, protected router: Router) {
    }

    ngOnInit() {
        this.route.data.subscribe(({showBackButton = undefined}) => this.showBackButton = showBackButton);
    }

    toggleSidebar() {
        this.toggleSidebarService.toggleSidebar();
    }

    followBackButton() {
        this.router.navigate(this.showBackButton);
    }
}
