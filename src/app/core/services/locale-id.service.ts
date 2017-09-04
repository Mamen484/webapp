import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChannelLanguage } from '../entities/channel-language.enum';
import { HelpCenterLanguage } from '../entities/help-center-language';

export const LOCALES_MAP = {
    'us': 'en'
};

@Injectable()
export class LocaleIdService {

    public localeId: keyof typeof ChannelLanguage;

    static detectLocale(originalLocaleId) {
        if (ChannelLanguage.hasOwnProperty(originalLocaleId)) {
            return originalLocaleId;
        }
        if (ChannelLanguage.hasOwnProperty(originalLocaleId.slice(0, 2))) {
            return originalLocaleId.slice(0, 2);
        }
        if (ChannelLanguage.hasOwnProperty(LOCALES_MAP[originalLocaleId.slice(0, 2)])) {
            return LOCALES_MAP[originalLocaleId.slice(0, 2)];
        }
        return environment.DEFAULT_LANGUAGE;
    }

    constructor(@Inject(LOCALE_ID) protected originalLocaleId) {
        this.localeId = LocaleIdService.detectLocale(this.originalLocaleId);
    }

    getHelpCenterLanguage(): HelpCenterLanguage {
        switch (this.localeId) {
            case 'it':
            case 'es':
                return this.localeId;

            case'fr':
                return 'fr_fr';

            default:
                return 'en';
        }
    }
}
