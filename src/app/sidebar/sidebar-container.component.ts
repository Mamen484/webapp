import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ToggleSidebarService } from '../core/services/toggle-sidebar.service';
import { MatSidenav } from '@angular/material';

@Component({
    selector: 'sf-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss']
})
export class SidebarContainerComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;

    opened = true;
    isMobile = false;

    constructor(protected mediaObserver: ObservableMedia, protected toggleSidebarSevice: ToggleSidebarService) {
    }

    ngOnInit() {
        this.toggleSidebarSevice.getSubscription().subscribe(() => this.sidenav.toggle());
        this.mediaObserver.subscribe((value) => {
            this.opened = value.mqAlias !== 'xs';
            this.isMobile = value.mqAlias === 'xs';
        })
    }

}
