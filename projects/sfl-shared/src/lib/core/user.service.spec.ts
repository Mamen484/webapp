import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SflUserService } from './user.service';
import { SflLocalStorageService } from './local-storage.service';
import { SFL_API } from './entities/src/sfl-dependencies';

describe('UserService', () => {
    let setItemSpy: jasmine.Spy;
    beforeEach(() => {
       setItemSpy = jasmine.createSpy('localStorage.setItem()');
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SflUserService,
                {provide: SflLocalStorageService, useValue: {setItem: setItemSpy}},
                {provide: SFL_API, useValue: 'someLink'},
            ]
        });
    });

    it('should be created', inject([SflUserService], (service: SflUserService) => {
        expect(service).toBeTruthy();
    }));

    it('should request /me resource',
        inject([SflUserService, HttpTestingController],
            (service: SflUserService, httpMock: HttpTestingController) => {
                service.fetchAggregatedInfo().subscribe();
                const req = httpMock.expectOne('someLink/me');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should request /auth resource',
        inject([SflUserService, HttpTestingController],
            (service: SflUserService, httpMock: HttpTestingController) => {
                service.login('username1', 'password1').subscribe();
                const req = httpMock.expectOne( 'someLink/auth');
                expect(req.request.method).toEqual('POST');
                expect(req.request.body.username).toEqual('username1');
                expect(req.request.body.password).toEqual('password1');
                expect(req.request.body.grant_type).toEqual('password');
                httpMock.verify();
            }));
});
