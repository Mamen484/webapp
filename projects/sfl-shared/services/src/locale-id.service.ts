import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { SFL_LANGUAGE_OPTIONS } from 'sfl-shared/entities';

const DEFAULT_LOCALE = 'en';

export const LOCALES_MAP = {
    'us': 'en'
};

/**
 * A service that allows you to safely work with the localeId,
 * and guarantees that the localeId leads to an appropriate version app.
 */
@Injectable({
    providedIn: 'root'
})
export class SflLocaleIdService {

    public localeId;

    /**
     * Ensure to have localeId the value from languageOptions object
     *
     * @param originalLocaleId
     * @param languageOptions
     */
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
        return DEFAULT_LOCALE;
    }

    constructor(@Inject(LOCALE_ID) protected originalLocaleId, @Inject(SFL_LANGUAGE_OPTIONS) protected languageOptions) {
        this.localeId = SflLocaleIdService.detectLocale(this.originalLocaleId, this.languageOptions);
    }


}
