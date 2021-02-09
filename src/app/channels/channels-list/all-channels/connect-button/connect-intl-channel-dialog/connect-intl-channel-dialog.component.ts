import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
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
