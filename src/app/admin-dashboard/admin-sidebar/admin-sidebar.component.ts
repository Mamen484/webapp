import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
    selector: 'sf-admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
    hideTooltips = false;

    constructor(protected media: ObservableMedia) {
        this.media.subscribe(() => this.hideTooltips = this.media.isActive('xs'));
    }
}
