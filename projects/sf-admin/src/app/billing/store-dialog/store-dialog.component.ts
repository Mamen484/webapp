import { Component, Inject, OnInit } from '@angular/core';
import { BillingStore } from '../billing-store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { clone } from 'lodash';

@Component({
    selector: 'sfa-store-dialog',
    templateUrl: './store-dialog.component.html',
    styleUrls: ['./store-dialog.component.scss']
})
export class StoreDialogComponent implements OnInit {

    store = new BillingStore();

    constructor(@Inject(MAT_DIALOG_DATA) protected data, protected matDialogRef: MatDialogRef<BillingStore>) {
        if (data) {
            this.store = clone(data);
        }
    }

    ngOnInit() {
    }

    save() {
        this.matDialogRef.close(clone(this.store));
    }

}
