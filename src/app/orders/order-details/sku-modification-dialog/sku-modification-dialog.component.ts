import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-sku-modification-dialog',
    templateUrl: './sku-modification-dialog.component.html',
    styleUrls: ['./sku-modification-dialog.component.scss']
})
export class SkuModificationDialogComponent implements OnInit {

    sku: string;

    constructor(@Inject(MAT_DIALOG_DATA) protected data, protected matDialogRef: MatDialogRef<SkuModificationDialogComponent>) {
    }

    ngOnInit() {
        this.sku = this.data && this.data.sku || '';
    }

    save() {
        this.matDialogRef.close(this.sku);
    }

}
