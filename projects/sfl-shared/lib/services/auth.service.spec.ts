import { TestBed } from '@angular/core/testing';
import { SflAuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SFL_API } from 'sfl-shared/entities';
import { SflLocalStorageService } from './local-storage.service';
import { Location } from '@angular/common';

describe('AuthService', () => {

    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let location: jasmine.SpyObj<Location>;

    beforeEach(() => {
        localStorage = jasmine.createSpyObj('SflLocalStorageService', ['setItem', 'removeItem', 'getItem']);
        location = jasmine.createSpyObj('Location spy', ['path', 'replaceState']);
        location.path.and.returnValue('');
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SflAuthService,
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: SFL_API, useValue: 'someLink'},
                {provide: Location, useValue: location},
            ]
        });
    });

    it('should be created', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        expect(service).toBeTruthy();
    });

    it('should request /auth resource', () => {

        const service: SflAuthService = TestBed.get(SflAuthService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

        service.login('username1', 'password1').subscribe();
        const req = httpMock.expectOne('someLink/auth');
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.username).toEqual('username1');
        expect(req.request.body.password).toEqual('password1');
        expect(req.request.body.grant_type).toEqual('password');
        httpMock.verify();
    });

    it('should write a token into a localstorage on successful auth', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

        service.login('username1', 'password1').subscribe();
        const req = httpMock.expectOne('someLink/auth');
        req.flush({token_type: 'Bearer', access_token: 'some_token'});
        expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', 'Bearer some_token');
    });

    it('should write a token into a localstorage on loginByToken call', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);

        service.loginByToken('some_token');
        expect(localStorage.setItem).toHaveBeenCalledWith('Authorization', 'Bearer some_token');
    });

    it('should remove a token from a localstorage on logout() call', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        service.logout();
        expect(localStorage.removeItem).toHaveBeenCalledWith('Authorization');
    });

    it('should return true from isLoggedIn(), when some value is stored in the local storage', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        localStorage.getItem.and.returnValue('some value');
        expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false from isLoggedIn(), when no value is in the local storage', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        localStorage.getItem.and.returnValue(undefined);
        expect(service.isLoggedIn()).toBe(false);
    });

    it('should return a value from the local storage on getAuthString()', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        localStorage.getItem.and.returnValue('some string');
        expect(service.getAuthString()).toBe('some string');
    });

    it('should return a token from the local storage on getAuthToken()', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        localStorage.getItem.and.returnValue('Bearer some_token');
        expect(service.getAuthToken()).toBe('some_token');
    });

    it('should return an empty string on getAuthToken() when there is nothing in the local storage', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        localStorage.getItem.and.returnValue(undefined);
        expect(service.getAuthToken()).toBe('');
    });

    it('should remove the token from the url', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        location.path.and.returnValue('/some/path?token=ksjdfksjdfksjn&store=307');
        service.removeTokenFromUrl();
        expect(location.replaceState).toHaveBeenCalledWith('/some/path?store=307')
    });

    it('should do nothing is the token is not in url', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        location.path.and.returnValue('/some/path?store=307');
        service.removeTokenFromUrl();
        expect(location.replaceState).not.toHaveBeenCalled();
    });
});
