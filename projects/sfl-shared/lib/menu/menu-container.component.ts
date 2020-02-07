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
import { SflToggleSidebarService } from 'sfl-shared/sidebar';

export const DEFAULT_MENU_BACKGROUND = '#072343';

/**
 * A container for a menu creation.
 *
 * @example
 *
 * <sfl-menu-container>
 *    <div class="mat-title" routerLink="/">Current store</div>
 *    <div class="sf-fill-space" fxShow fxHide.gt-sm></div>
 *    <mat-icon class="sf-nav-icon" [matMenuTriggerFor]="accountMenu">person_outline</mat-icon>
 *    <mat-menu #accountMenu="matMenu" [overlapTrigger]="false" classList="account-menu">
 *        <a mat-menu-item routerLink="/admin" *ngIf="isAdmin">Admin</a>
 *        <a mat-menu-item (click)="logout()">Logout</a>
 *    </mat-menu>
 * </sfl-menu-container>
 */
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
     * contains undefined if we don't need to show 'back to login' button,
     * otherwise contains a route to follow after click on 'back' button
     */
    showBackButton?: any[];

    constructor(protected toggleSidebarService: SflToggleSidebarService,
                protected route: ActivatedRoute,
                protected router: Router) {
        this.router.events.subscribe(routerEvent => this.checkRouterEvent(routerEvent));
    }

    ngOnInit() {
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
