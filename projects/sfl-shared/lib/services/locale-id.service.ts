import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { SFL_DEFAULT_LANGUAGE, SFL_LANGUAGE_OPTIONS } from 'sfl-shared/entities';

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
     * Ensure that localeId equals to one of the keys of languageOptions constant.
     * If no - return the default language instead.
     *
     * @param originalLocaleId
     * @param languageOptions
     * @param defaultLanguage
     */
    static detectLocale(originalLocaleId, languageOptions, defaultLanguage = 'en') {
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
        return defaultLanguage;
    }

    constructor(@Inject(LOCALE_ID) protected originalLocaleId,
                @Inject(SFL_LANGUAGE_OPTIONS) protected languageOptions,
                @Inject(SFL_DEFAULT_LANGUAGE) protected defaultLanguage,
    ) {
        this.localeId = SflLocaleIdService.detectLocale(this.originalLocaleId, this.languageOptions, this.defaultLanguage);
    }
}
