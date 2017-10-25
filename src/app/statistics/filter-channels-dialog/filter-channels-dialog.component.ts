import { Component, Inject } from '@angular/core';
import { toPairs } from 'lodash';
import { Store } from '@ngrx/store';

import { ChannelType } from '../../core/entities/channel-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { AppState } from '../../core/entities/app-state';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-filter-channels-dialog',
    templateUrl: './filter-channels-dialog.component.html',
    styleUrls: ['./filter-channels-dialog.component.scss']
})
export class FilterChannelsDialogComponent {
    types = toPairs(ChannelType);
    filter = new ChannelsRequestParams();
    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;

    constructor(protected dialogRef: MatDialogRef<FilterChannelsDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected data: ChannelsRequestParams,
                protected appStore: Store<AppState>) {

        this.initializeFilter();

    }

    cancel() {
        this.dialogRef.close();
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