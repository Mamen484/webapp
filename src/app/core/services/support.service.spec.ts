import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SupportService } from './support.service';
import { LocaleIdService } from './locale-id.service';

describe('SupportService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SupportService, {provide: LocaleIdService, useValue: {getHelpCenterLanguage: () => 'fr_fr'}}]
        });
    });

    it('should be created', inject([SupportService], (service: SupportService) => {
        expect(service).toBeTruthy();
    }));

    it('should call support service with specified params', inject([SupportService, HttpTestingController], (service: SupportService, httpMock: HttpTestingController) => {
        service.searchArticles('something').subscribe();
        httpMock.expectOne('https://support.shopping-feed.com/api/v2/articles/search?text=something&in_support_center=true&locale=fr_fr')
    }));
});
