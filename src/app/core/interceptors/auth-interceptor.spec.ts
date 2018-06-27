import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

describe('AuthInterceptor', () => {

    let getItemSpy: jasmine.Spy;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem()');
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                {provide: LocalStorageService, useValue: {getItem: getItemSpy}}
            ]
        });
    });

    beforeEach(() => {
        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
    });


    it('should add Authorization and Accept headers to an http request when a local storage has an Authorization header', () => {
        getItemSpy.and.returnValue('some auth string');
        http.get(environment.API_URL + '/anything').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'some auth string'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add only an Accept header to an http request when a local storage DOES NOT have an Authorization header', () => {
        getItemSpy.and.returnValue(null);
        http.get(environment.API_URL + '/anything').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.has('Authorization') === false
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should NOT add Authorization and accept headers to an http request when the domain differs from environment.API_URL', () => {
        http.get('/anything').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.has('Authorization') === false
            && req.headers.has('Accept') === false);

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/auth resource', () => {
        http.get(environment.API_URL + '/shopify/auth/maksym-test7').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === environment.APP_AUTHORIZATION
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/store resource', () => {
        http.get(environment.API_URL + '/shopify/store/maksym-test7').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === environment.APP_AUTHORIZATION
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should NOT add App Authorization and Accept headers to an http request when the user requests shopify/subscription resource', () => {
        getItemSpy.and.returnValue('tarampapam');
        http.post(environment.API_URL + '/shopify/subscription/maksym-test7', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add App Authorization and Accept headers to an http request when the user requests POST /store resource', () => {
        http.post(environment.API_URL + '/store', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === environment.APP_AUTHORIZATION
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests GET /store resource', () => {
        getItemSpy.and.returnValue('tarampapam');
        http.get(environment.API_URL + '/store').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests POST /store/112/order/acknowledge resource', () => {
        getItemSpy.and.returnValue('tarampapam');
        http.post(environment.API_URL + '/store/112/order/acknowledge', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests GET /store/112/tag resource', () => {
        getItemSpy.and.returnValue('tarampapam');
        http.get(environment.API_URL + '/store/112/tag', {}).subscribe();
        const req = httpMock.expectOne(environment.API_URL + '/store/112/tag');
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers.get('Authorization')).toEqual('tarampapam');
        expect(req.request.headers.get('Accept')).toEqual('application/json');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests POST /store/112/tag resource', () => {
        getItemSpy.and.returnValue('tarampapam');
        http.post(environment.API_URL + '/store/112/tag', {}).subscribe();
        const req = httpMock.expectOne(environment.API_URL + '/store/112/tag');
        expect(req.request.method).toEqual('POST');
        expect(req.request.headers.get('Authorization')).toEqual('tarampapam');
        expect(req.request.headers.get('Accept')).toEqual('application/json');
        httpMock.verify();
    });

});
