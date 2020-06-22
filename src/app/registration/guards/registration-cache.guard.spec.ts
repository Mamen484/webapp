import { RegistrationCacheGuard } from './registration-cache.guard';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';

describe('RegistrationCacheGuard', () => {
    let getItemSpy: jasmine.Spy;
    let locationHrefSpy;
    let guard: RegistrationCacheGuard;
    let shopifyService: jasmine.SpyObj<ShopifyAuthentifyService>;
    beforeEach(() => {
        locationHrefSpy = jasmine.createSpy('location.href');
        shopifyService = jasmine.createSpyObj(['getStoreData', 'updateStore'])
        let window = {
            nativeWindow: {
                location: {}
            }
        };

        Object.defineProperty(window.nativeWindow.location, 'href', {
            set: locationHrefSpy
        });
        guard = new RegistrationCacheGuard(shopifyService, <any>window, <any>{loginByToken: jasmine.createSpy()});

    });

    it('should return true when the store.storeId is 0',
        done => {
            shopifyService.getStoreData.and.returnValue(of(<any>{storeId: 0, owner: {token: 'some-token'}}));
            guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
                done();
            })
        });

    it('should update the store and return false when localStorage does contain store and the store.storeId is higher than 0', done => {
        shopifyService.getStoreData.and.returnValue(of(<any>{storeId: 1, owner: {token: 'some-token'}}));
        shopifyService.updateStore.and.returnValue(of({}));
        guard.canActivate(<any>{code: 123, queryParams: {something1: 12, something2: 25}}).subscribe(canActivate => {
            expect(shopifyService.updateStore).toHaveBeenCalled();
            expect(canActivate).toEqual(false);
            let args = shopifyService.updateStore.calls.mostRecent().args;
            expect(args[0].storeId).toEqual(1);
            done();
        });
    });

    it('should redirect the user to the homepage when cached store.storeId is higher than 0', done => {
        shopifyService.getStoreData.and.returnValue(of(<any>{storeId: 1, owner: {token: 'some-token'}}));
        shopifyService.updateStore.and.returnValue(of({}));
        guard.canActivate(<any>{queryParams: {something1: 12, something2: 25}}).subscribe(canActivate => {
            expect(locationHrefSpy).toHaveBeenCalledWith(environment.APP_URL);
            done();
        });
    });
});
