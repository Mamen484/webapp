import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SupportLinkService {

    supportLink = environment.SUPPORT_URL;

    constructor(@Inject(LOCALE_ID) protected localeId = environment.DEFAULT_LANGUAGE) {
        this.defineSupportLink();
    }

    defineSupportLink() {
        switch (this.localeId) {
            case 'fr':
                this.supportLink = `${environment.SUPPORT_URL}/customer/fr_fr/portal/articles`;
                break;

            case 'it':
            case 'es':
                this.supportLink = `${environment.SUPPORT_URL}/customer/${this.localeId}/portal/articles`;
                break;

            default:
                this.supportLink = environment.SUPPORT_URL;
        }

    }
}