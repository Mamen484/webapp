import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SflLocaleIdService } from 'sfl-shared/services';
import { environment } from '../../../../../../environments/environment';

@Component({
    templateUrl: './request-failed-dialog.component.html',
    styleUrls: ['./request-failed-dialog.component.scss']
})
export class RequestFailedDialogComponent {

    contactEmail;

    constructor(public dialogRef: MatDialogRef<RequestFailedDialogComponent>, protected localeIdService: SflLocaleIdService) {
        this.contactEmail = environment.contactEmail[this.localeIdService.localeId] || environment.contactEmail.en;
    }

    close() {
        this.dialogRef.close();
    }

}
