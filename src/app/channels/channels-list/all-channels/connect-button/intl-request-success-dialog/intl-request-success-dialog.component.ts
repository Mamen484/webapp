import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './intl-request-success-dialog.component.html',
    styleUrls: ['./intl-request-success-dialog.component.scss']
})
export class IntlRequestSuccessDialogComponent {

    constructor(public dialogRef: MatDialogRef<IntlRequestSuccessDialogComponent>) {
    }

    close() {
        this.dialogRef.close();
    }

}
