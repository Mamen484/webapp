import { TestBed } from '@angular/core/testing';

import { SflAuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SflLocalStorageService } from '../core/local-storage.service';
import { SFL_API } from '../core/entities/src/sfl-dependencies';

describe('AuthService', () => {

    let localStorage: jasmine.SpyObj<SflLocalStorageService>;

    beforeEach(() => {
        localStorage = jasmine.createSpyObj('SflLocalStorageService', ['setItem', 'removeItem']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SflAuthService,
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: SFL_API, useValue: 'someLink'},
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

    it('should remove a token from a localstorage on logout() call', () => {
        const service: SflAuthService = TestBed.get(SflAuthService);
        service.logout();
        expect(localStorage.removeItem).toHaveBeenCalledWith('Authorization');
    });
});
