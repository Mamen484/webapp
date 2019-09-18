import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-unsaved-data-dialog',
    templateUrl: './unsaved-data-dialog.component.html',
    styleUrls: ['./unsaved-data-dialog.component.scss']
})
export class UnsavedDataDialogComponent {
    constructor(protected matDialogRef: MatDialogRef<UnsavedDataDialogComponent>) {
    }

    confirm() {
        this.matDialogRef.close(true);
    }
}
