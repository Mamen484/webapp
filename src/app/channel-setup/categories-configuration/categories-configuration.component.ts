import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AmazonAccountDialogComponent } from '../amazon-account-dialog/amazon-account-dialog.component';

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    constructor(protected matDialog: MatDialog) {
    }

    ngOnInit() {
        // prevent 'Expression has changed after it was checked' message
        setTimeout( () => this.matDialog.open(AmazonAccountDialogComponent, {disableClose: true}));
    }

}
