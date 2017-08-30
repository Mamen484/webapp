import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'sf-request-failed-dialog',
  templateUrl: './request-failed-dialog.component.html',
  styleUrls: ['./request-failed-dialog.component.scss']
})
export class RequestFailedDialogComponent {

  contactEmail = environment.CONTACT_EMAIL;

    constructor(public dialogRef: MdDialogRef<RequestFailedDialogComponent>) {
    }

    close() {
        this.dialogRef.close();
    }

}
