import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';

export function getTranslationProviders(): Promise<Object[]> {
    // Get the locale id from the navigator (for now)
    // const locale = (window.navigator.language.substr(0, 2) || 'en') as string;
    const locale = document['locale'] as string;

    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];

    // Ex: 'locale/messages.es.xlf`
    const translationFile = `./locale/${locale}/messages.xlf`;

    return getTranslationsWithSystemJs(translationFile)
        .then( (translations: string ) => [
            { provide: TRANSLATIONS, useValue: translations },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            { provide: LOCALE_ID, useValue: locale }
        ])
        .catch(() => noProviders); // ignore if file not found
}

function getTranslationsWithSystemJs(file: string) {
    return SystemJS.import(file + '!text'); // relies on text plugin
}

declare let SystemJS: any;