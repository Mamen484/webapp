import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-new-tag-dialog',
    templateUrl: './new-tag-dialog.component.html',
    styleUrls: ['./new-tag-dialog.component.scss']
})
export class NewTagDialogComponent implements OnInit {

    tagName = '';

    constructor(protected matDialogRef: MatDialogRef<NewTagDialogComponent>) {
    }

    ngOnInit() {
    }

    save() {
        this.matDialogRef.close(this.tagName);
    }

}
