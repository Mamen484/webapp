import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './delete-row-dialog.component.html',
    styleUrls: ['./delete-row-dialog.component.scss']
})
export class DeleteRowDialogComponent implements OnInit {

    constructor(protected matDialogRef: MatDialogRef<DeleteRowDialogComponent>) {
    }

    ngOnInit() {
    }

    confirm() {
        this.matDialogRef.close(true);
    }

}
