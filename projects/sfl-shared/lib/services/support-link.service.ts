import { Inject, Injectable, LOCALE_ID } from '@angular/core';

export const supportLink = 'https://shoppingfeed.zendesk.com/hc';

@Injectable({
    providedIn: 'root'
})
export class SupportLinkService {

    supportLink = supportLink;

    constructor(@Inject(LOCALE_ID) protected localeId) {
        this.defineSupportLink();
    }

    defineSupportLink() {
        switch (this.localeId) {
            case 'fr':
            case 'it':
            case 'es':
                this.supportLink = `${supportLink}/${this.localeId}`;
                break;

            default:
                this.supportLink = `${supportLink}/en-us`;
        }

    }
}
