import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('AuthInterceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
            ]
        });
    });


    it('should add Authorization and accept headers to an http request',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get(environment.API_URL + '/anything').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === environment.DEFAULT_AUTHORIZATION
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should NOT add Authorization and accept headers to an http request when the domain differs from environment.API_URL',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get('/anything').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') === false
                    && req.headers.has('Accept') === false);

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));
});
