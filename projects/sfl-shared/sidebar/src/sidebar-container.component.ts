import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
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
    styleUrls: ['./sidebar-container.component.scss'],
})
export class SflSidebarContainerComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    /** The sidebar will be placed below the menu */
    @Input() menuHeight = '64px';

    /** The sidebar width */
    @Input() width = '75px';

    /** Background color of the sidebar */
    @Input() bgColor = 'white';

    /** Right border color of the sidebar */
    @Input() borderColor = '#eeeeee';


    opened = true;
    isMobile = false;

    constructor(protected mediaObserver: MediaObserver, protected toggleSidebarService: SflToggleSidebarService) {
    }

    ngOnInit() {
        this.toggleSidebarService.getSubscription().subscribe(() => this.sidenav.toggle());
        this.mediaObserver.media$.subscribe((value) => {
            this.opened = value.mqAlias !== 'xs';
            this.isMobile = value.mqAlias === 'xs';
        })
    }

}
