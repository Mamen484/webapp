import { Component, Inject, Optional } from '@angular/core';
import { CategoryState } from '../category-state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'sf-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

    categoryState = CategoryState;
    chosenMapping = CategoryState.NotSpecified;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) protected data: CategoryState, protected matDialogRef: MatDialogRef<FilterDialogComponent, CategoryState>) {
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
