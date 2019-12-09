import { Injectable } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { SflLocaleIdService } from 'sfl-shared/services';
import { strings as englishStrings } from 'ngx-timeago/language-strings/en';

@Injectable({
    providedIn: 'root'
})
export class SfTimeagoIntlService extends TimeagoIntl {
    strings = englishStrings; // load english strings by default
    constructor(protected localeIdService: SflLocaleIdService) {
        super();
        // do not load strings, loaded by default
        if (this.localeIdService.localeId === 'en') {
            return;
        }
        import(`ngx-timeago/language-strings/${this.localeIdService.localeId}`).then(({strings}) => {
            this.strings = strings;
            this.changes.next();
        });
    }
}
