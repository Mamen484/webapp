import { TestBed, inject } from '@angular/core/testing';

import { LocaleIdService } from './locale-id.service';
import { LOCALE_ID } from '@angular/core';

describe('LocaleIdService', () => {

    describe('english locale', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LocaleIdService,
                    {provide: LOCALE_ID, useValue: 'en_US'}
                ]
            });
        });

        it('should be created', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service).toBeTruthy();
        }));

        it('should contain a property localeId with properly formatted language', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.localeId).toEqual('en');
        }));

        it('should return "en" language on getHelpCenterLanguage call', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.getHelpCenterLanguage()).toEqual('en');
        }));
    });

    describe('italian locale', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LocaleIdService,
                    {provide: LOCALE_ID, useValue: 'it_IT'}
                ]
            });
        });
        it('should contain a property localeId with properly formatted language', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.localeId).toEqual('it');
        }));

        it('should return "it" language on getHelpCenterLanguage call', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.getHelpCenterLanguage()).toEqual('it');
        }));
    });

    describe('french locale', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LocaleIdService,
                    {provide: LOCALE_ID, useValue: 'fr_FR'}
                ]
            });
        });
        it('should contain a property localeId with properly formatted language', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.localeId).toEqual('fr');
        }));

        it('should return "fr_fr" language on getHelpCenterLanguage call', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.getHelpCenterLanguage()).toEqual('fr_fr');
        }));
    });

    describe('spanish locale', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LocaleIdService,
                    {provide: LOCALE_ID, useValue: 'es'}
                ]
            });
        });
        it('should contain a property localeId with properly formatted language', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.localeId).toEqual('es');
        }));

        it('should return "es" language on getHelpCenterLanguage call', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.getHelpCenterLanguage()).toEqual('es');
        }));
    });

    describe('german locale', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    LocaleIdService,
                    {provide: LOCALE_ID, useValue: 'de'}
                ]
            });
        });
        it('should contain a property localeId with properly formatted language', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.localeId).toEqual('de');
        }));

        it('should return "en" language on getHelpCenterLanguage call', inject([LocaleIdService], (service: LocaleIdService) => {
            expect(service.getHelpCenterLanguage()).toEqual('en');
        }));
    });


});
