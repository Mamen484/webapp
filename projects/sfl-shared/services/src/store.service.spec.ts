import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoreService } from './store.service';
import { SflLocaleIdService } from 'sfl-shared/services';
import { ChannelsRequestParams, SFL_API } from 'sfl-shared/entities';
import { allowNoExpectations } from '../../../../src/app/core/entities/allow-no-expectaions';

describe('StoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                StoreService,
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: SFL_API, useValue: 'apiUrl'},
            ]
        });
    });

    it('should be created', inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should request /storechannel resource with storeId in params when calling getAllConfiguredChannels method',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getStoreChannels(24, Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18})).subscribe();

                const req = httpMock.expectOne('apiUrl/store/24/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));

    it('should request /stat/store/89 resource when calling getStatistics method',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getStatistics(89).subscribe();
                const req = httpMock.expectOne('apiUrl/stat/store/89');
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));
    it('should request /store/11/channel resource when getStoreChannels() is called with foreignChannels = false',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getStoreChannels(11, Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}), false).subscribe();
                httpMock.expectOne('apiUrl/store/11/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats');
                allowNoExpectations();
                httpMock.verify();
            }));

    it('should request /channel resource when getStoreChannels() is called with foreignChannels = true',
        inject([StoreService, HttpTestingController],
            (service: StoreService, httpMock: HttpTestingController) => {
                service.getStoreChannels(11,  Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}), true).subscribe();
                httpMock.expectOne('apiUrl/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats');
                allowNoExpectations();
                httpMock.verify();
            }));

});
