import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sfa-credentials-dialog',
    templateUrl: './credentials-dialog.component.html',
    styleUrls: ['./credentials-dialog.component.scss']
})
export class CredentialsDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: {login: string, password: string, channelName: string}) {
    }

    ngOnInit() {
    }

}
