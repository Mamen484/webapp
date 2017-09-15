import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { WindowRefService } from '../../core/services/window-ref.service';
import { LegacyLinkService } from '../../core/services/legacy-link.service';

@Component({
    selector: 'sf-accept-channel-dialog',
    templateUrl: './accept-channel-dialog.component.html',
    styleUrls: ['./accept-channel-dialog.component.scss']
})
export class AcceptChannelDialogComponent implements OnInit {

    constructor(@Inject(MD_DIALOG_DATA) protected data,
                protected windowRef: WindowRefService,
                protected legacyLinkService: LegacyLinkService) {
    }

    ngOnInit() {
    }

    goToLegacy(path) {
        this.windowRef.nativeWindow.location.href = this.legacyLinkService.getLegacyLink(path)
    }

}
