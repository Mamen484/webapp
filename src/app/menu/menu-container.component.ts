import { Component, Input } from '@angular/core';
import { ToggleSidebarService } from '../core/services/toggle-sidebar.service';

export const DEFAULT_MENU_BACKGROUND = '#072343';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent {
    @Input() backgroundColor = DEFAULT_MENU_BACKGROUND;

    constructor(protected toggleSidebarService: ToggleSidebarService) {
    }

    toggleSidebar(){
        this.toggleSidebarService.toggleSidebar();
    }
}
