import { TestBed, inject } from '@angular/core/testing';
import { ShopifyAuthentifyService } from './shopify-authentify.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from 'sfl-shared/entities';

describe('ShopifyAuthentifyServuce', () => {
    let httpClient;
    beforeEach(() => {
        httpClient = jasmine.createSpyObj('HttpClient', ['get', 'patch']);
        httpClient.get.and.returnValue(of({}));
        TestBed.configureTestingModule({
            providers: [
                ShopifyAuthentifyService,
                {provide: HttpClient, useValue: httpClient}
            ]
        });
    });

    it('getAuthorizationUrl should fetch a proper resource',
        inject([ShopifyAuthentifyService, HttpClient],
            (service: ShopifyAuthentifyService) => {
                service.getAuthorizationUrl('someShop.myshopify.com').subscribe();
                expect(httpClient.get).toHaveBeenCalledWith(environment.API_URL + '/shopify/auth/someShop')
            }));

    it('getAuthorizationUrl should return an auth url',
        inject([ShopifyAuthentifyService, HttpClient],
            (service: ShopifyAuthentifyService) => {
                httpClient.get.and.returnValue(of({authorizeUrl: 'some url'}));
                service.getAuthorizationUrl('someShop.myshopify.com').subscribe(url => {
                    expect(url).toEqual('some url')
                });
            })
    );

    it('getStoreData should call a proper resource', inject([ShopifyAuthentifyService, HttpClient],
        (service: ShopifyAuthentifyService) => {
            service.getStoreData('someshop.myshopify.com', {code: 'c11', timestamp: 'ts11', hmac: 'hm11', host: 'any.host.com'}).subscribe();
            expect(httpClient.get.calls.mostRecent().args[0]).toEqual(environment.API_URL + '/shopify/store/someshop');
            expect(httpClient.get.calls.mostRecent().args[1].params.get('code')).toEqual('c11');
            expect(httpClient.get.calls.mostRecent().args[1].params.get('timestamp')).toEqual('ts11');
            expect(httpClient.get.calls.mostRecent().args[1].params.get('hmac')).toEqual('hm11');
            expect(httpClient.get.calls.mostRecent().args[1].params.get('host')).toEqual('any.host.com');
        }));

    it('getStoreData should NOT call api twice, but load data from cache for the second call', inject([ShopifyAuthentifyService, HttpClient],
        (service: ShopifyAuthentifyService) => {
            let data1 = {}, data2 = {};
            service.getStoreData('someshop.myshopify.com', {
                code: 'c11',
                timestamp: 'ts11',
                hmac: 'hm11'
            }).subscribe(data => data1 = data);
            service.getStoreData('someshop.myshopify.com', {
                code: 'c11',
                timestamp: 'ts11',
                hmac: 'hm11'
            }).subscribe(data => data2 = data);
            expect(httpClient.get).toHaveBeenCalledTimes(1);
            expect(data2).toEqual(data1);
        }));

    it('updateStore should make a proper request to api', inject([ShopifyAuthentifyService, HttpClient],
        (service: ShopifyAuthentifyService) => {
        let store = new Store();
        store.owner.token = 'token token';
        store.storeId = 343;
        service.updateStore(store);
        expect(httpClient.patch.calls.mostRecent().args[0]).toEqual(environment.API_URL + '/store/343');
        expect(httpClient.patch.calls.mostRecent().args[1][0].op).toEqual('replace');
        expect(httpClient.patch.calls.mostRecent().args[1][0].path).toEqual('/owner/token');
        expect(httpClient.patch.calls.mostRecent().args[1][0].value).toEqual('token token');
    }))
});
