import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SupportService } from './support.service';
import { SflLocaleIdService } from 'sfl-shared';
import { environment } from '../../../environments/environment';
import { allowNoExpectations } from '../entities/allow-no-expectaions';

describe('SupportService', () => {

    describe('searchArticles method', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [SupportService, {provide: SflLocaleIdService, useValue: {}}]
            });
        });


        it('should call support service with specified params', inject([SupportService, HttpTestingController],
            (service: SupportService, httpMock: HttpTestingController) => {
                service.helpCenterLanguage = 'fr_fr';
                service.searchArticles('something').subscribe();
                httpMock.expectOne(environment.API_URL + '/desk/articles/search?text=something&in_support_center=true&locale=fr_fr');
                allowNoExpectations();
            }));
    });

    describe('helpCenterLanguage property', () => {
        it('should return "fr_fr" language on getHelpCenterLanguage call', () => {
            const service = new SupportService(<any>{}, <any>{localeId: 'fr'});
            expect(service.helpCenterLanguage).toEqual('fr_fr');
        });
        it('should return "es" language on getHelpCenterLanguage call', () => {
            const service = new SupportService(<any>{}, <any>{localeId: 'es'});
            expect(service.helpCenterLanguage).toEqual('es');
        });
        it('should return "en" language on getHelpCenterLanguage call', () => {
            const service = new SupportService(<any>{}, <any>{localeId: 'anything'});
            expect(service.helpCenterLanguage).toEqual('en');
        });

        it('should return "en" language on getHelpCenterLanguage call', () => {
            const service = new SupportService(<any>{}, <any>{localeId: 'en'});
            expect(service.helpCenterLanguage).toEqual('en');
        });
        it('should return "it" language on getHelpCenterLanguage call', () => {
            const service = new SupportService(<any>{}, <any>{localeId: 'it'});
            expect(service.helpCenterLanguage).toEqual('it');
        });
    });

});
