import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagColor } from '../../core/entities/orders/tag-color';

@Component({
    selector: 'sf-new-tag-dialog',
    templateUrl: './new-tag-dialog.component.html',
    styleUrls: ['./new-tag-dialog.component.scss']
})
export class NewTagDialogComponent implements OnInit {

    tagName = '';
    color: TagColor = 'blue';

    constructor(protected matDialogRef: MatDialogRef<NewTagDialogComponent, {name: string, color: TagColor}>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: {name?: string, color?: TagColor}) {
        if (!this.data) {
            this.data = {};
        }
    }

    ngOnInit() {
        if (this.data.name) {
            this.tagName = this.data.name;
        }
        if (this.data.color) {
            this.color = this.data.color;
        }
    }

    save() {
        this.matDialogRef.close({name: this.tagName, color: this.color});
    }

}
