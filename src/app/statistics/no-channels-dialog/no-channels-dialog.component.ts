import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

export const SHOW_CHANNELS = 1;
export const SCHEDULE_A_CALL = 2;

@Component({
  selector: 'sf-no-channels-dialog',
  templateUrl: './no-channels-dialog.component.html',
  styleUrls: ['./no-channels-dialog.component.scss']
})
export class NoChannelsDialogComponent {

    constructor(public dialogRef: MdDialogRef<NoChannelsDialogComponent>) {
    }


    showChannels() {
        this.dialogRef.close(SHOW_CHANNELS);
    }

    scheduleACall() {
        this.dialogRef.close(SCHEDULE_A_CALL);
    }
}
