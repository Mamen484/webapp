const countryLocalePairs = {
    us: 'en-US',
    uk: 'en-GB',
    ca: 'en-CA',
    au: 'en-AU',
    in: 'en-IN',
    br: 'pt-BR'
};

export class LocaleId {

    static createFromCountryCode(countryCode: string, defaultLocale: string) {
        let localeId = countryCode && countryCode.replace('_', '-');
        localeId = countryLocalePairs[localeId.toLowerCase()] || localeId;
        return Intl.NumberFormat.supportedLocalesOf(localeId).length
            ? localeId
            : defaultLocale;
    }

    private constructor() {
    }
}
