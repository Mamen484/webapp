import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-accept-channel-dialog',
    templateUrl: './accept-channel-dialog.component.html',
    styleUrls: ['./accept-channel-dialog.component.scss']
})
export class AcceptChannelDialogComponent {

    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;
    // @TODO: consider refactoring this link into some file
    pricesLink = 'http://www.shopping-feed.com/pricing/';

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
    }
}
