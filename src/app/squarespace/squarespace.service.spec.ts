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

    it('should call an appropriate endpoint', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.auth(243).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/squarespace/auth/243`);
        expect(req.request.method).toBe('GET');
    });
});
