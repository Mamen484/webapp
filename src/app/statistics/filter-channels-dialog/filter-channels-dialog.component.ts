import { Component, Inject, OnInit } from '@angular/core';
import { toPairs } from 'lodash';

import { ChannelLanguage } from '../../core/entities/channel-language.enum';
import { ChannelType } from '../../core/entities/channel-type.enum';
import { ChannelCategory } from '../../core/entities/channel-category.enum';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-filter-channels-dialog',
    templateUrl: './filter-channels-dialog.component.html',
    styleUrls: ['./filter-channels-dialog.component.scss']
})
export class FilterChannelsDialogComponent implements OnInit {
    countries = toPairs(ChannelLanguage);
    types = toPairs(ChannelType);
    categories = toPairs(ChannelCategory);

    filter = new ChannelsRequestParams();
    appUrl = environment.APP_URL;

    constructor(public dialogRef: MdDialogRef<FilterChannelsDialogComponent>, @Inject(MD_DIALOG_DATA) public data: ChannelsRequestParams) {
        this.filter = Object.assign({}, data);
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    accept() {
        this.dialogRef.close(this.filter);
    }

}
