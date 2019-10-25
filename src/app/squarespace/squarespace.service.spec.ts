import { TestBed } from '@angular/core/testing';

import { SquarespaceService } from './squarespace.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('SquarespaceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    }));

    it('should be created', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        expect(service).toBeTruthy();
    });

    it('should call an appropriate endpoint on auth()', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.auth().subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/squarespace/auth`);
        expect(req.request.method).toBe('GET');
    });

    it('should call an appropriate endpoint on getStore()', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.getStore('someCode', 'someState').subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/squarespace/store?code=someCode&state=someState`);
        expect(req.request.method).toBe('GET');
    });
});
