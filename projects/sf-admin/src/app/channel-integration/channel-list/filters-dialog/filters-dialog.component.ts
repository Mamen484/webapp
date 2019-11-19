import { Component, Inject, OnInit } from '@angular/core';
import { ChannelsPermission } from './channels-permission.enum';
import { Filter } from './filter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
    templateUrl: './filters-dialog.component.html',
    styleUrls: ['./filters-dialog.component.scss']
})
export class FiltersDialogComponent implements OnInit {

    channelsPermission = ChannelsPermission;
    filter = new Filter();

    constructor(protected matDialogRef: MatDialogRef<FiltersDialogComponent, Filter>, @Inject(MAT_DIALOG_DATA) protected data) {
    }

    accept() {
        this.matDialogRef.close(this.filter);
    }

    ngOnInit() {
        this.filter = cloneDeep(this.data);
    }

}
