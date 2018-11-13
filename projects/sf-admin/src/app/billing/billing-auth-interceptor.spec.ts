import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BillingAuthInterceptor } from './billing-auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SFL_API, SFL_APP_TOKEN } from 'sfl-shared/src/lib/entities';
import { SflAuthService } from 'sfl-shared/src/lib/auth';
import { environment } from '../../environments/environment';

describe('AuthInterceptor', () => {

    let http: HttpClient;
    let httpMock: HttpTestingController;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(() => {
        authService = jasmine.createSpyObj('SflAuthService', ['getAuthString', 'isLoggedIn'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: BillingAuthInterceptor, multi: true},
                {provide: SflAuthService, useValue: authService},
            ]
        });
    });

    beforeEach(() => {
        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
    });


    it('should add Authorization and Accept headers to an http request when a user is logged in', () => {
        authService.getAuthString.and.returnValue('some auth string');
        authService.isLoggedIn.and.returnValue(true);
        http.get(`${environment.SFA_BILLING_API}/anything`).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'some auth string'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add only an Accept header to an http request when a local storage DOES NOT have an Authorization header', () => {
        authService.getAuthString.and.returnValue(null);
        http.get(`${environment.SFA_BILLING_API}/anything`).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.has('Authorization') === false
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should NOT add Authorization and accept headers to an http request when the domain differs from SFL_API', () => {
        http.get('/anything').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.has('Authorization') === false
            && req.headers.has('Accept') === false);

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });
});
