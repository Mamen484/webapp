import { Component, Inject, Optional } from '@angular/core';
import { ConfigurationState } from '../configuration-state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'sf-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

    categoryState = ConfigurationState;
    chosenMapping = ConfigurationState.NotSpecified;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) protected data: ConfigurationState, protected matDialogRef: MatDialogRef<FilterDialogComponent, ConfigurationState>) {
        if (data) {
            this.chosenMapping = data;
        }
    }

    filter() {
        this.matDialogRef.close(this.chosenMapping);
    }

    close() {
        this.matDialogRef.close();
    }
}
