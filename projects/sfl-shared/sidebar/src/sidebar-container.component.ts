import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';
import { SflToggleSidebarService } from './toggle-sidebar.service';

/**
 * A sidebar container that allows to build a sidebar easily.
 *
 * @example
 *
 * <sfl-sidebar-container>
 *     <mat-list>
 *         <mat-list-item class="mat-active">
 *             <a routerLink="/" class="homepage-link">
 *                 <mat-icon>home</mat-icon> Homepage
 *             </a>
 *         </mat-list-item>
 *    </mat-list>
 * </sfl-sidebar-container>
 */
@Component({
    selector: 'sfl-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss']
})
export class SflSidebarContainerComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    opened = true;
    isMobile = false;

    constructor(protected mediaObserver: ObservableMedia, protected toggleSidebarSevice: SflToggleSidebarService) {
    }

    ngOnInit() {
        this.toggleSidebarSevice.getSubscription().subscribe(() => this.sidenav.toggle());
        this.mediaObserver.subscribe((value) => {
            this.opened = value.mqAlias !== 'xs';
            this.isMobile = value.mqAlias === 'xs';
        })
    }

}
