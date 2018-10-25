import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDialogData } from '../../core/entities/orders/confirm-dialog-data';

@Component({
    selector: 'sf-confirm-shipping-dialog',
    templateUrl: './confirm-shipping-dialog.component.html',
    styleUrls: ['./confirm-shipping-dialog.component.scss']
})
export class ConfirmShippingDialogComponent implements OnInit {

    constructor(protected dialogRef: MatDialogRef<ConfirmShippingDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
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
