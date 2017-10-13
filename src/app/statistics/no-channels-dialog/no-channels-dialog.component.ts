import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { environment } from '../../../environments/environment';

export const SHOW_CHANNELS = 1;
export const SCHEDULE_A_CALL = 2;

@Component({
  selector: 'sf-no-channels-dialog',
  templateUrl: './no-channels-dialog.component.html',
  styleUrls: ['./no-channels-dialog.component.scss']
})
export class NoChannelsDialogComponent {

    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;

    constructor(public dialogRef: MatDialogRef<NoChannelsDialogComponent>) {
    }


    showChannels() {
        this.dialogRef.close(SHOW_CHANNELS);
    }

    scheduleACall() {
        this.dialogRef.close(SCHEDULE_A_CALL);
    }
}
