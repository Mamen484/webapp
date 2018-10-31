import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { SFL_LANGUAGE_OPTIONS } from './entities/src/sfl-dependencies';

export const LOCALES_MAP = {
    'us': 'en'
};

@Injectable()
export class SflLocaleIdService {

    public localeId;

    static detectLocale(originalLocaleId, languageOptions) {
        originalLocaleId = originalLocaleId.toLowerCase();
        if (languageOptions.hasOwnProperty(originalLocaleId)) {
            return originalLocaleId;
        }
        if (languageOptions.hasOwnProperty(originalLocaleId.slice(0, 2))) {
            return originalLocaleId.slice(0, 2);
        }
        if (languageOptions.hasOwnProperty(LOCALES_MAP[originalLocaleId.slice(0, 2)])) {
            return LOCALES_MAP[originalLocaleId.slice(0, 2)];
        }
        return originalLocaleId;
    }

    constructor(@Inject(LOCALE_ID) protected originalLocaleId, @Inject(SFL_LANGUAGE_OPTIONS) protected languageOptions) {
        this.localeId = SflLocaleIdService.detectLocale(this.originalLocaleId, this.languageOptions);
    }


}
