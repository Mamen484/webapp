import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserService
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
});
