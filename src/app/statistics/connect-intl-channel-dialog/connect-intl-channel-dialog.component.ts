import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'sf-connect-international-channel-dialog',
    templateUrl: './connect-intl-channel-dialog.component.html',
    styleUrls: ['./connect-intl-channel-dialog.component.scss']
})
export class ConnectIntlChannelDialogComponent {

    constructor(public dialogRef: MdDialogRef<ConnectIntlChannelDialogComponent>) {
    }


    disagree() {
        this.dialogRef.close(false);
    }

    agree() {
        this.dialogRef.close(true);
    }

}
