import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sf-accept-channel-dialog',
    templateUrl: './accept-channel-dialog.component.html',
    styleUrls: ['./accept-channel-dialog.component.scss']
})
export class AcceptChannelDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
    }
}
