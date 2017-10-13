import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { WindowRefService } from '../services/window-ref.service';

describe('AuthInterceptor', () => {

    let getItemSpy: jasmine.Spy;
    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem()')
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                {provide: WindowRefService, useValue: {nativeWindow: {localStorage: {getItem: getItemSpy}}}}
            ]
        });
    });


    it('should add Authorization and Accept headers to an http request when a local storage has an Authorization header',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                getItemSpy.and.returnValue('some auth string');
                http.get(environment.API_URL + '/anything').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === 'some auth string'
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should add only an Accept header to an http request when a local storage DOES NOT have an Authorization header',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                getItemSpy.and.returnValue(null);
                http.get(environment.API_URL + '/anything').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.has('Authorization') === false
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

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/auth resource',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get(environment.API_URL + '/shopify/auth/maksym-test7').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === environment.APP_AUTHORIZATION
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/store resource',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.get(environment.API_URL + '/shopify/store/maksym-test7').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === environment.APP_AUTHORIZATION
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should NOT add App Authorization and Accept headers to an http request when the user requests shopify/subscription resource',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                getItemSpy.and.returnValue('tarampapam');
                http.post(environment.API_URL + '/shopify/subscription/maksym-test7', {}).subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === 'tarampapam'
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('POST');
                httpMock.verify();
            }));

    it('should add App Authorization and Accept headers to an http request when the user requests POST /store resource',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                http.post(environment.API_URL + '/store', {}).subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === environment.APP_AUTHORIZATION
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('POST');
                httpMock.verify();
            }));

    it('should add User Authorization and Accept headers to an http request when the user requests GET /store resource',
        inject([HttpClient, HttpTestingController],
            (http: HttpClient, httpMock: HttpTestingController) => {
                getItemSpy.and.returnValue('tarampapam');
                http.get(environment.API_URL + '/store').subscribe();
                const request = httpMock.expectOne(req =>
                    req.headers.get('Authorization') === 'tarampapam'
                    && req.headers.get('Accept') === 'application/json');

                expect(request.request.method).toEqual('GET');
                httpMock.verify();
            }));
});
