import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    selector: 'sfa-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
    hideTooltips = false;

    constructor(protected media: MediaObserver) {
        this.media.media$.subscribe(() => this.hideTooltips = this.media.isActive('xs'));
        (<any>window).sidebar = this;
    }
}
