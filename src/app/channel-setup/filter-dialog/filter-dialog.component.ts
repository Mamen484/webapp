import { Component, Inject, Optional } from '@angular/core';
import { CategoryMapping } from '../category-mapping';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-filter-dialog',
    templateUrl: './filter-dialog.component.html',
    styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

    categoryMapping = CategoryMapping;
    chosenMapping = CategoryMapping.NotSpecified;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) protected data: CategoryMapping, protected matDialogRef: MatDialogRef<FilterDialogComponent, CategoryMapping>) {
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
