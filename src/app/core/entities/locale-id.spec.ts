import { LocaleId } from './locale-id';

describe('LocaleId', () => {
    it('it should return a valid locale', () => {
        expect(LocaleId.createFromCountryCode('us', 'fr')).toBe('en-US');
        expect(LocaleId.createFromCountryCode('uk', 'fr')).toBe('en-GB');
        expect(LocaleId.createFromCountryCode('ca', 'fr')).toBe('en-CA');
        expect(LocaleId.createFromCountryCode('au', 'fr')).toBe('en-AU');
        expect(LocaleId.createFromCountryCode('in', 'fr')).toBe('en-IN');
        expect(LocaleId.createFromCountryCode('br', 'fr')).toBe('pt-BR');
        expect(LocaleId.createFromCountryCode('fr', 'en')).toBe('fr');
        expect(LocaleId.createFromCountryCode('de', 'fr')).toBe('de');
        expect(LocaleId.createFromCountryCode('pt', 'fr')).toBe('pt');
        expect(LocaleId.createFromCountryCode('es', 'fr')).toBe('es');
        expect(LocaleId.createFromCountryCode('kdflk', 'fr')).toBe('fr');
        expect(LocaleId.createFromCountryCode('kdflk', 'en')).toBe('en');
    });
});
