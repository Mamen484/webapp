import { Component, Inject, OnInit } from '@angular/core';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../../core/entities/orders/confirm-dialog-data';

@Component({
    selector: 'sf-confirm-cancellation-dialog',
    templateUrl: './confirm-cancellation-dialog.component.html',
    styleUrls: ['./confirm-cancellation-dialog.component.scss']
})
export class ConfirmCancellationDialogComponent implements OnInit {

    constructor(protected matDialogRef: MatDialogRef<CarrierDetailsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
    }

    ngOnInit() {
    }

    cancel() {
        this.matDialogRef.close();
    }

    accept() {
        this.matDialogRef.close(true);
    }
}
