import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-new-tag-dialog',
    templateUrl: './new-tag-dialog.component.html',
    styleUrls: ['./new-tag-dialog.component.scss']
})
export class NewTagDialogComponent implements OnInit {

    tagName = '';

    constructor(protected matDialogRef: MatDialogRef<NewTagDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data) {
        if (!this.data) {
            this.data = {};
        }
    }

    ngOnInit() {
        if (this.data.name) {
            this.tagName = this.data.name;
        }
    }

    save() {
        this.matDialogRef.close(this.tagName);
    }

}
