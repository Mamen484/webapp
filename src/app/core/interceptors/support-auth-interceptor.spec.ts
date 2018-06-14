import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { SupportAuthInterceptor } from './support-auth-interceptor';
import { allowNoExpectations } from '../entities/allow-no-expectaions';

describe('SupportAuthInterceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: SupportAuthInterceptor, multi: true},
            ]
        });
    });


    it('should add Authorization and accept headers to an http request',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get(environment.SUPPORT_URL + '/anything').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === environment.SUPPORT_AUTHORIZATION
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));


    it('should NOT add Authorization and accept headers to an http request for the domain that differ from environment.SUPPORT_URL',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get('/anything').subscribe();
                httpMock.expectOne(req =>
                    req.headers.has('Authorization') === false
                    && req.headers.has('Accept') === false);
                allowNoExpectations();
                httpMock.verify();
            }));
});
