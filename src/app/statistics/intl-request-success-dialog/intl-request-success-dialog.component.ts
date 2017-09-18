import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'sf-intl-request-success-dialog',
    templateUrl: './intl-request-success-dialog.component.html',
    styleUrls: ['./intl-request-success-dialog.component.scss']
})
export class IntlRequestSuccessDialogComponent {

    constructor(public dialogRef: MdDialogRef<IntlRequestSuccessDialogComponent>) {
    }

    close() {
        this.dialogRef.close();
    }

}
