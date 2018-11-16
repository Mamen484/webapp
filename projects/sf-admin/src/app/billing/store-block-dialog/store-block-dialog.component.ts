import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'sfa-store-block-dialog',
    templateUrl: './store-block-dialog.component.html',
    styleUrls: ['./store-block-dialog.component.scss']
})
export class StoreBlockDialogComponent implements OnInit {

    constructor(protected matDialogRef: MatDialogRef<StoreBlockDialogComponent, boolean | undefined>) {
    }

    ngOnInit() {
    }

    block() {
        this.matDialogRef.close(true);
    }

}
