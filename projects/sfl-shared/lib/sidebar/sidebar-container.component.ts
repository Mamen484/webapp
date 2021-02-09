import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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

    @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

    /** The sidebar will be placed below the menu */
    @Input() menuHeight = '64px';

    /** The sidebar width */
    @Input() width = '75px';

    /** Background color of the sidebar */
    @Input() bgColor = 'white';

    /** Right border color of the sidebar */
    @Input() borderColor = '#eeeeee';

    /** CSS position of mat-sidenav */
    @Input() position = 'sticky';

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.setWindowHeight();
    }

    windowHeight;


    opened = true;
    isMobile = false;

    constructor(protected toggleSidebarService: SflToggleSidebarService) {
    }

    ngOnInit() {
        this.toggleSidebarService.getSubscription().subscribe(() => this.sidenav.toggle());
        this.setWindowHeight();
    }

    /**
     * we cannot rely on 100vh on ipad, it is intentionally calculated differently, so we take inner window height to calculate it correctly
     */
    private setWindowHeight(){
        this.windowHeight = window.innerHeight + 'px';
    }

}
