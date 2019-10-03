import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    template: `
        <div matDialogTitle i18n>Unsaved data</div>

        <mat-dialog-content i18n>
            Warning: Are you sure you wish to leave this page? All unsaved changes will be lost.
        </mat-dialog-content>

        <mat-dialog-actions>
            <button mat-button [color]="color" matDialogClose i18n>Cancel</button>
            <button mat-button [color]="color" (click)="confirm()" i18n>Confirm</button>
        </mat-dialog-actions>
    `,
    styles: []
})
export class UnsavedDataDialogComponent {

    @Input() color: 'primary' | 'accent' = 'accent';

    constructor(protected matDialogRef: MatDialogRef<UnsavedDataDialogComponent>) {
    }

    confirm() {
        this.matDialogRef.close(true);
    }
}
