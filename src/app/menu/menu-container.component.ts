import { Component, OnInit } from '@angular/core';
import { LegacyLinkService } from '../core/services/legacy-link.service';
import { WindowRefService } from '../core/services/window-ref.service';

@Component({
    selector: 'sf-menu-container',
    templateUrl: './menu-container.component.html',
    styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent {

    constructor(protected legacyLink: LegacyLinkService, protected windowRef: WindowRefService) {
    }

    goToLegacy() {
        this.windowRef.nativeWindow.location.href = this.legacyLink.getLegacyLink('/');
    }

}
