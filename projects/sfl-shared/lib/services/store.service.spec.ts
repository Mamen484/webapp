import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StoreService } from './store.service';
import { SflLocaleIdService } from 'sfl-shared/services';
import { ChannelsRequestParams, SFL_API } from 'sfl-shared/entities';

describe('StoreService', () => {
    let service: StoreService;
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                StoreService,
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: SFL_API, useValue: 'apiUrl'},
            ]
        });

        service = TestBed.get(StoreService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should request /storechannel resource with storeId in params when calling getAllConfiguredChannels method', () => {
        service.getStoreChannels(24).subscribe();

        const req = httpMock.expectOne('apiUrl/store/24/channel?page=1&limit=200&country=&name=&type=&segment=&status=&embed=stats&sortBy=installed:desc,channelName:asc');
        expect(req.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should request /stat/store/89 resource when calling getStatistics method', () => {
        service.getStatistics(89).subscribe();
        const req = httpMock.expectOne('apiUrl/stat/store/89');
        expect(req.request.method).toEqual('GET');
        httpMock.verify();
    });
    it('should request /store/11/channel resource when getStoreChannels() is called with foreignChannels = false', () => {
        service.getStoreChannels(11, Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}), false).subscribe();
        const req = httpMock.expectOne('apiUrl/store/11/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats&sortBy=installed:desc,channelName:asc');
        expect(req.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should should assign channel property getStoreChannels() is called with foreignChannels = false', async () => {
        const respPromise =
            service.getStoreChannels(11, Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}), false)
                .toPromise();
        const req = httpMock.expectOne('apiUrl/store/11/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats&sortBy=installed:desc,channelName:asc');
        req.flush({_embedded: {storeChannel: []}});
        const resp = await respPromise;
        expect(resp).toEqual(<any>{_embedded: {channel: []}});
    });

    it('should request /channel resource when getStoreChannels() is called with foreignChannels = true', () => {
        service.getStoreChannels(11, Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}), true).subscribe();
        const req = httpMock.expectOne('apiUrl/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats');
        expect(req.request.method).toEqual('GET');
        httpMock.verify();
    });

    it('should format ChannelResponse into StoreChannelResponse when getStoreChannels() is called with foreignChannels = true',
        async () => {
            const respPromise = service.getStoreChannels(
                11,
                Object.assign(new ChannelsRequestParams(), {page: 1, limit: 18}),
                true
            ).toPromise();
            const req = httpMock.expectOne('apiUrl/channel?page=1&limit=18&country=&name=&type=&segment=&status=&embed=stats');
            req.flush({_embedded: {channel: [{}]}});
            const resp = await respPromise;
            expect(resp).toEqual(<any>{_embedded: {channel: [{installed: false, _embedded: {channel: {}}}]}});
        });

    it('should cache charge and call the server only once', () => {
        expect(service.getStoreCharge(12)).toBe(service.getStoreCharge(12));
        const req = httpMock.expectOne('apiUrl/store/12/charge');
        expect(req.request.method).toBe('GET');
    });

    it('should request /store on fetchAvailableStores()', () => {
        service.fetchAvailableStores().subscribe();
        const req = httpMock.expectOne('apiUrl/store?name=');
        expect(req.request.method).toBe('GET');
    });

    it('should request /store with filtering param on fetchAvailableStores()', () => {
        service.fetchAvailableStores('someName').subscribe();
        const req = httpMock.expectOne('apiUrl/store?name=someName')
        expect(req.request.method).toBe('GET');
    });

    it('should request /store/id on getStore()', () => {
        service.getStore(12).subscribe();
        const req = httpMock.expectOne('apiUrl/store/12');
        expect(req.request.method).toBe('GET');
    });

    it('should request POST /store on createStore()', () => {
        service.createStore(<any>{}).subscribe();
        const req = httpMock.expectOne('apiUrl/store');
        expect(req.request.method).toBe('POST');
    });

});
