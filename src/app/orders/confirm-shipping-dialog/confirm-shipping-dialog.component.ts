import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-confirm-shipping-dialog',
    templateUrl: './confirm-shipping-dialog.component.html',
    styleUrls: ['./confirm-shipping-dialog.component.scss']
})
export class ConfirmShippingDialogComponent implements OnInit {

    constructor(protected dialogRef: MatDialogRef<ConfirmShippingDialogComponent>) {
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close(false);
    }

    accept() {
        this.dialogRef.close(true);
    }

}
