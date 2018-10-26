import { SflLocaleIdService } from './locale-id.service';

describe('LocaleIdService', () => {

    it('should contain a property localeId with properly formatted language (en)', () => {
        const service = new SflLocaleIdService('en_US', {en: 'UK'});
        expect(service.localeId).toEqual('en');
    });

    it('should contain a property localeId with properly formatted language (it)', () => {
        const service = new SflLocaleIdService('it_IT', {en: 'UK', it: 'Italy'});
        expect(service.localeId).toEqual('it');
    });

    it('should contain a property localeId with properly formatted language (fr)', () => {
        const service = new SflLocaleIdService('fr_FR', {en: 'UK', fr: 'France'});
        expect(service.localeId).toEqual('fr');
    });

    it('should contain a property localeId with properly formatted language (es)', () => {
        const service = new SflLocaleIdService('es_ES', {en: 'UK', es: 'Spain'});
        expect(service.localeId).toEqual('es');
    });

    it('should contain a property localeId with properly formatted language (de)', () => {
        const service = new SflLocaleIdService('de_DE', {en: 'UK', de: 'Germany'});
        expect(service.localeId).toEqual('de');
    });

    it('should contain a property localeId with properly formatted language (pt)', () => {
        const service = new SflLocaleIdService('pt_PT', {en: 'UK', pt: 'Portugal'});
        expect(service.localeId).toEqual('pt');
    });

});
