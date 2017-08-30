import { Component, Inject } from '@angular/core';
import { toPairs } from 'lodash';
import { Store } from '@ngrx/store';

import { ChannelLanguage } from '../../core/entities/channel-language.enum';
import { ChannelType } from '../../core/entities/channel-type.enum';
import { ChannelCategory } from '../../core/entities/channel-category.enum';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { AppState } from '../../core/entities/app-state';

@Component({
    selector: 'sf-filter-channels-dialog',
    templateUrl: './filter-channels-dialog.component.html',
    styleUrls: ['./filter-channels-dialog.component.scss']
})
export class FilterChannelsDialogComponent {
    countries = toPairs(ChannelLanguage);
    types = toPairs(ChannelType);
    categories = toPairs(ChannelCategory);

    filter = new ChannelsRequestParams();

    constructor(protected dialogRef: MdDialogRef<FilterChannelsDialogComponent>,
                @Inject(MD_DIALOG_DATA) protected data: ChannelsRequestParams,
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
            this.filter.country = this.filter.country || store.country;
        });
    }

}
