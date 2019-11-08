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
        service.getStore('someCode').subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/squarespace/store?code=someCode`);
        expect(req.request.method).toBe('GET');
    });

    it('should use encodeURIComponent() for the code param when fetching getStore() to get back the code that was passed in the query params', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.getStore('1|HT0Jrb8kM5V8oom2ChaJPkwzUHRLTEAtSUvAolPp7DU=|e21DjI6I0Kncv84N5TNoeoJqzkJtsqhfTZLgkbRClxM=').subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/squarespace/store?code=1%7CHT0Jrb8kM5V8oom2ChaJPkwzUHRLTEAtSUvAolPp7DU%3D%7Ce21DjI6I0Kncv84N5TNoeoJqzkJtsqhfTZLgkbRClxM%3D`);
        expect(req.request.method).toBe('GET');
    });

    it('should call an appropriate endpoint on patchStore()', () => {
        const service: SquarespaceService = TestBed.get(SquarespaceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.patchStore({
            storeId: 902,
            accessToken: 'access token 902',
            refreshToken: 'refresh token 902',
            tokenExpiresAt: 902902902,
        }).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/902`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual([{
            op: 'replace',
            path: '/feed/settings/credentials',
            value: {
                accessToken: 'access token 902',
                expiryTimeAccessToken: 902902902,
                refreshToken: 'refresh token 902'
            },
        }]);
    });
});
