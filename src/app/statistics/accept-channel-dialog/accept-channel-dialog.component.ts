import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { StoreCharge } from '../../core/entities/store-charge';

@Component({
    selector: 'sf-accept-channel-dialog',
    templateUrl: './accept-channel-dialog.component.html',
    styleUrls: ['./accept-channel-dialog.component.scss']
})
export class AcceptChannelDialogComponent {

    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;
    // @TODO: consider refactoring this link into some file
    pricesLink = 'https://www.shopping-feed.com/shopify-privilege-pricing/';

    constructor(@Inject(MAT_DIALOG_DATA) public data: {logo: string, link: string, charge: StoreCharge}) {
    }
}
