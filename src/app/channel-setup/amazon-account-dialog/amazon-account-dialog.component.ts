import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './amazon-account-dialog.component.html',
    styleUrls: ['./amazon-account-dialog.component.scss']
})
export class AmazonAccountDialogComponent {

    constructor(protected matDialogRef: MatDialogRef<AmazonAccountDialogComponent>) {
    }

    close() {
        this.matDialogRef.close();
    }

}
