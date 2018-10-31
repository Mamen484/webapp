import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { SflLocalStorageService } from 'sfl-shared';

describe('UserService', () => {
    let setItemSpy: jasmine.Spy;
    beforeEach(() => {
       setItemSpy = jasmine.createSpy('localStorage.setItem()');
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserService,
                {provide: SflLocalStorageService, useValue: {setItem: setItemSpy}}
            ]
        });
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    it('should request /me resource',
        inject([UserService, HttpTestingController],
            (service: UserService, httpMock: HttpTestingController) => {
                service.fetchAggregatedInfo().subscribe();
                const req = httpMock.expectOne(environment.API_URL + '/me');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should request /auth resource',
        inject([UserService, HttpTestingController],
            (service: UserService, httpMock: HttpTestingController) => {
                service.login('username1', 'password1').subscribe();
                const req = httpMock.expectOne(environment.API_URL + '/auth');
                expect(req.request.method).toEqual('POST');
                expect(req.request.body.username).toEqual('username1');
                expect(req.request.body.password).toEqual('password1');
                expect(req.request.body.grant_type).toEqual('password');
                httpMock.verify();
            }));
});
