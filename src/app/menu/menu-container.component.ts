import { Component, Input } from '@angular/core';
import { LoadingFlagService } from '../core/services/loading-flag.service';

export const DEFAULT_MENU_BACKGROUND = '#072343';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent {
    @Input() backgroundColor = DEFAULT_MENU_BACKGROUND;
    loadingNextRoute = false;

    constructor(protected loadingFlagService: LoadingFlagService) {
        this.loadingFlagService.isLoading().subscribe(isLoading => this.loadingNextRoute = isLoading);
    }
}
