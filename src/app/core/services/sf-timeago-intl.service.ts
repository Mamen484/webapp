import { Injectable } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { SflLocaleIdService } from 'sfl-shared/services';
import { strings as enStrings } from 'ngx-timeago/language-strings/en';
import { strings as frStrings } from 'ngx-timeago/language-strings/fr';
import { strings as esStrings } from 'ngx-timeago/language-strings/es';
import { strings as itStrings } from 'ngx-timeago/language-strings/it';
import { strings as deStrings } from 'ngx-timeago/language-strings/de';
import { strings as ptStrings } from 'ngx-timeago/language-strings/pt';

@Injectable({
    providedIn: 'root'
})
export class SfTimeagoIntlService extends TimeagoIntl {
    strings = enStrings; // load english strings by default
    constructor(protected localeIdService: SflLocaleIdService) {
        super();
        switch (this.localeIdService.localeId) {
            case 'fr':
                this.strings = frStrings;
                return;
            case 'es':
                this.strings = esStrings;
                return;
            case 'it':
                this.strings = itStrings;
                return;
            case 'de':
                this.strings = deStrings;
                return;
            case 'pt':
                this.strings = ptStrings;
                return;
        }
    }
}
