import { ngxZendeskWebwidgetConfig, ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { ZENDESK_ACCOUNT_LINK } from './variables';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
    constructor(@Inject(ZENDESK_ACCOUNT_LINK) public accountUrl) {
        super();
    }

    beforePageLoad(zE: ngxZendeskWebwidgetService): any {
        zE.hide();
    }

}
