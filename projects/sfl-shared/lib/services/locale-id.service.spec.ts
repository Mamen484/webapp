import { LOCALES_MAP, SflLocaleIdService } from './locale-id.service';

describe('LocaleIdService', () => {

    it('should contain a property localeId with properly formatted language (en)', () => {
        const service = new SflLocaleIdService('en_US', {en: 'UK'}, 'en');
        expect(service.localeId).toEqual('en');
    });

    it('should contain a property localeId with properly formatted language (it)', () => {
        const service = new SflLocaleIdService('it_IT', {en: 'UK', it: 'Italy'}, 'en');
        expect(service.localeId).toEqual('it');
    });

    it('should contain a property localeId with properly formatted language (fr)', () => {
        const service = new SflLocaleIdService('fr_FR', {en: 'UK', fr: 'France'}, 'en');
        expect(service.localeId).toEqual('fr');
    });

    it('should contain a property localeId with properly formatted language (es)', () => {
        const service = new SflLocaleIdService('es_ES', {en: 'UK', es: 'Spain'}, 'en');
        expect(service.localeId).toEqual('es');
    });

    it('should contain a property localeId with properly formatted language (de)', () => {
        const service = new SflLocaleIdService('de_DE', {en: 'UK', de: 'Germany'}, 'en');
        expect(service.localeId).toEqual('de');
    });

    it('should contain a property localeId with properly formatted language (pt)', () => {
        const service = new SflLocaleIdService('pt_PT', {en: 'UK', pt: 'Portugal'}, 'en');
        expect(service.localeId).toEqual('pt');
    });

});

describe('SflLocaleIdService.detectLocale', () => {
    it('should return localeId if it is in the language options', () => {
        expect(SflLocaleIdService.detectLocale('locale', {tratata: 'any', locale: 'any'}))
            .toBe('locale');
    });

    it('should return the default language if the original locale id is NOT in the language options', () => {
        expect(SflLocaleIdService.detectLocale('locale', {tratata: 'any', tratata2: 'any'}))
            .toBe('en');
    });

    it('should return localeId 2 first letters are in the language options', () => {
        expect(SflLocaleIdService.detectLocale('en-GB', {en: 'any'}))
            .toBe('en');
    });

    it('should match a locale from LOCALES_MAP', () => {
        expect(SflLocaleIdService.detectLocale(Object.keys(LOCALES_MAP)[0], {en: 'any'}))
            .toBe(Object.values(LOCALES_MAP)[0]);
    });
});
