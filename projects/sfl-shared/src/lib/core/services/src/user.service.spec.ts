import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SflUserService } from './user.service';
import { SflLocalStorageService } from './local-storage.service';
import { AggregatedUserInfo, SFL_API } from 'sfl-shared/src/lib/core/entities';

describe('UserService', () => {
    let setItemSpy: jasmine.Spy;
    let service: SflUserService;
    let httpMock: HttpTestingController;
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

        service = TestBed.get(SflUserService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should request /me resource', () => {
        service.fetchAggregatedInfo().subscribe();
        const req = httpMock.expectOne('someLink/me');
        expect(req.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should request server only once', () => {
        const call1 = service.fetchAggregatedInfo();
        const call2 = service.fetchAggregatedInfo();
        expect(call1).toBe(call2);
        call1.subscribe();
        call2.subscribe();
        httpMock.expectOne('someLink/me');
        httpMock.verify();
    });

    it('should return an instance of AggregatedUserInfo', async () => {
        let respPromise = service.fetchAggregatedInfo().toPromise();
        const req = httpMock.expectOne('someLink/me');
        req.flush({});
        expect((await respPromise) instanceof AggregatedUserInfo).toBe(true);
    });


});
