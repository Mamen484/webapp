import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CarrierInfo } from '../../core/entities/carrier-info';

@Component({
    selector: 'sf-carrier-details-dialog',
    templateUrl: './carrier-details-dialog.component.html',
    styleUrls: ['./carrier-details-dialog.component.scss']
})
export class CarrierDetailsDialogComponent implements OnInit {

    info = new CarrierInfo();

    constructor(protected matDialogRef: MatDialogRef<CarrierDetailsDialogComponent>) {
    }

    ngOnInit() {
    }

    cancel() {
        this.matDialogRef.close();
    }

    accept() {
        this.matDialogRef.close(this.info);
    }

}
