import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoreService } from './store.service';
import { environment } from '../../../environments/environment';

describe('StoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                StoreService
            ]
        });
    });

    it('should be created', inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should request /storechannel resource with storeId in params when calling getAllConfiguredChannels method',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getAllConfiguredChannels(24).subscribe();
                const req = httpMock.expectOne(environment.API_URL + '/storechannel?store=24');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should request /stat/store/89 resource when calling getStatistics method',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getStatistics(89).subscribe();
                const req = httpMock.expectOne(environment.API_URL + '/stat/store/89');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));
});
