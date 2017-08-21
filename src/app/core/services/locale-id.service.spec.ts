import { TestBed, inject } from '@angular/core/testing';

import { LocaleIdService } from './locale-id.service';
import { LOCALE_ID } from '@angular/core';

fdescribe('LocaleIdService', () => {

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
    });



});
