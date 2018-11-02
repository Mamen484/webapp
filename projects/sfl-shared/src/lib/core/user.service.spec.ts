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


});
