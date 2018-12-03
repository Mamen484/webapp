import { Component, Inject } from '@angular/core';
import { toPairs } from 'lodash';
import { Store } from '@ngrx/store';

import { ChannelType } from 'sfl-shared/entities';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChannelsRequestParams } from 'sfl-shared/entities';
import { AppState } from '../../core/entities/app-state';

@Component({
    selector: 'sf-filter-channels-dialog',
    templateUrl: './filter-channels-dialog.component.html',
    styleUrls: ['./filter-channels-dialog.component.scss']
})
export class FilterChannelsDialogComponent {
    types = toPairs(ChannelType);
    filter = new ChannelsRequestParams();

    constructor(protected dialogRef: MatDialogRef<FilterChannelsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected data: ChannelsRequestParams,
                protected appStore: Store<AppState>) {

        this.initializeFilter();

    }

    accept() {
        this.dialogRef.close(this.filter);
    }

    protected initializeFilter() {
        this.filter = Object.assign({}, this.data);
        this.appStore.select('currentStore').subscribe(store => {
            this.filter.country = this.filter.country || store.country.toLowerCase();
        });
    }

}
