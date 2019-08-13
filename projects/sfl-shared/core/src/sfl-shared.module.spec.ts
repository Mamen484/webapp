import { SflSharedModule } from './sfl-shared.module';
import { TestBed } from '@angular/core/testing';
import { SFL_API, SFL_APP_TOKEN, SFL_BASE_HREF, SFL_LEGACY_LINK, SFL_LANGUAGE_OPTIONS, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';

describe('SflSharedModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SflSharedModule.forRoot({
                baseHref: 'base href',
                languageOptions: {'en': 'English'},
                sflApi: 'apiLink',
                sflLegacyLink: 'legacyLink',
                sflAppToken: 'appToken',
                sflCountriesListLink: 'countriesLink',
            })]
        });
    });

    it('should provide SFL_BASE_HREF', () => {
        expect(TestBed.get(SFL_BASE_HREF)).toEqual('base href');
    });

    it('should provide SFL_APP_TOKEN', () => {
        expect(TestBed.get(SFL_APP_TOKEN)).toEqual('appToken');
    });

    it('should provide SFL_LEGACY_LINK', () => {
        expect(TestBed.get(SFL_LEGACY_LINK)).toEqual('legacyLink');
    });

    it('should provide SFL_API', () => {
        expect(TestBed.get(SFL_API)).toEqual('apiLink');
    });

    it('should provide SFL_LANGUAGE_OPTIONS', () => {
        expect(TestBed.get(SFL_LANGUAGE_OPTIONS)).toEqual({'en': 'English'});
    });

    it('should provide SFL_COUNTRIES_LIST_LINK', () => {
        expect(TestBed.get(SFL_COUNTRIES_LIST_LINK)).toEqual('countriesLink');
    });
});
