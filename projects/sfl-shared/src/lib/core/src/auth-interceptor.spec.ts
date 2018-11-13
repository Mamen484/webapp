import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SFL_API, SFL_APP_TOKEN } from 'sfl-shared/src/lib/entities';
import { SflAuthService } from 'sfl-shared/src/lib/auth';

describe('AuthInterceptor', () => {

    let http: HttpClient;
    let httpMock: HttpTestingController;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(() => {
        authService = jasmine.createSpyObj('SflAuthService', ['getAuthString', 'isLoggedIn'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                {provide: SFL_API, useValue: 'apiLink'},
                {provide: SFL_APP_TOKEN, useValue: 'app_token'},
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
        http.get('apiLink/anything').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'some auth string'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add only an Accept header to an http request when a local storage DOES NOT have an Authorization header', () => {
        authService.getAuthString.and.returnValue(null);
        http.get('apiLink/anything').subscribe();
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

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/auth resource', () => {
        http.get('apiLink/shopify/auth/maksym-test7').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'app_token'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add App Authorization and Accept headers to an http request when the user requests shopify/store resource', () => {
        http.get('apiLink/shopify/store/maksym-test7').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'app_token'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should NOT add App Authorization and Accept headers to an http request when the user requests shopify/subscription resource', () => {
        authService.getAuthString.and.returnValue('tarampapam');
        authService.isLoggedIn.and.returnValue(true);
        http.post('apiLink/shopify/subscription/maksym-test7', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add App Authorization and Accept headers to an http request when the user requests POST /store resource', () => {
        http.post('apiLink/store', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'app_token'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests GET /store resource', () => {
        authService.getAuthString.and.returnValue('tarampapam');
        authService.isLoggedIn.and.returnValue(true);
        http.get('apiLink/store').subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests POST /store/112/order/acknowledge resource', () => {
        authService.getAuthString.and.returnValue('tarampapam');
        authService.isLoggedIn.and.returnValue(true);
        http.post('apiLink/store/112/order/acknowledge', {}).subscribe();
        const request = httpMock.expectOne(req =>
            req.headers.get('Authorization') === 'tarampapam'
            && req.headers.get('Accept') === 'application/json');

        expect(request.request.method).toEqual('POST');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests GET /store/112/order/tag resource', () => {
        authService.getAuthString.and.returnValue('tarampapam');
        authService.isLoggedIn.and.returnValue(true);
        http.get('apiLink/store/112/order/tag', {}).subscribe();
        const req = httpMock.expectOne('apiLink/store/112/order/tag');
        expect(req.request.method).toEqual('GET');
        expect(req.request.headers.get('Authorization')).toEqual('tarampapam');
        expect(req.request.headers.get('Accept')).toEqual('application/json');
        httpMock.verify();
    });

    it('should add User Authorization and Accept headers to an http request when the user requests POST /store/112/order/tag resource', () => {
        authService.getAuthString.and.returnValue('tarampapam');
        authService.isLoggedIn.and.returnValue(true);
        http.post('apiLink/store/112/order/tag', {}).subscribe();
        const req = httpMock.expectOne('apiLink/store/112/order/tag');
        expect(req.request.method).toEqual('POST');
        expect(req.request.headers.get('Authorization')).toEqual('tarampapam');
        expect(req.request.headers.get('Accept')).toEqual('application/json');
        httpMock.verify();
    });

});
