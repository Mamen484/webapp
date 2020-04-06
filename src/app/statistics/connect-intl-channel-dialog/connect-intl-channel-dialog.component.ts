import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'sf-connect-international-channel-dialog',
    templateUrl: './connect-intl-channel-dialog.component.html',
    styleUrls: ['./connect-intl-channel-dialog.component.scss']
})
export class ConnectIntlChannelDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConnectIntlChannelDialogComponent>) {
    }


    disagree() {
        this.dialogRef.close(false);
    }

    agree() {
        this.dialogRef.close(true);
    }

}
