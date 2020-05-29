import { RegistrationCacheGuard } from './registration-cache.guard';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('RegistrationCacheGuard', () => {
    let updateStoreSpy: jasmine.Spy;
    let getItemSpy: jasmine.Spy;
    let setItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    let locationHrefSpy;
    let guard;
    beforeEach(() => {
        updateStoreSpy = jasmine.createSpy('shopifyAuthentifyService.updateStore');
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        setItemSpy = jasmine.createSpy('localStorage.setItem');
        removeItemSpy = jasmine.createSpy('localStorage.removeItem');
        locationHrefSpy = jasmine.createSpy('location.href');

        let localStorage = {
            getItem: getItemSpy,
            removeItem: removeItemSpy,
            setItem: setItemSpy
        };

        let window = {
            nativeWindow: {
                location: {}
            }
        };

        Object.defineProperty(window.nativeWindow.location, 'href', {
            set: locationHrefSpy
        });

        guard = new RegistrationCacheGuard(<any>{
            updateStore: updateStoreSpy,
            getStoreData: () => of({owner: {token: 'token'}})
        }, <any>window, <any>localStorage);

    });

    it('should return true when localStorage does not contain cache',
        done => {
            getItemSpy.and.returnValue(null);
            guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
                done();
            })
        });

    it('should return true when localStorage does contain store, but the store.storeId is 0',
        done => {
            getItemSpy.and.returnValue('{"storeId": 0}');
            guard.canActivate(<any>{}).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
                done();
            })
        });

    it('should update the store and return false when localStorage does contain store and the store.storeId is higher than 0', done => {
        getItemSpy.and.returnValue('{"storeId": 1}');
        updateStoreSpy.and.returnValue(of({}));
        guard.canActivate(<any>{queryParams: {something1: 12, something2: 25}}).subscribe(canActivate => {
            expect(updateStoreSpy).toHaveBeenCalled();
            expect(canActivate).toEqual(false);
            let args = updateStoreSpy.calls.mostRecent().args;
            expect(args[0].storeId).toEqual(1);
            done();
        });
    });

    it('should redirect the user to the homepage when cached store.storeId is higher than 0', done => {
        getItemSpy.and.returnValue('{"storeId": 1}');
        updateStoreSpy.and.returnValue(of({}));
        guard.canActivate(<any>{queryParams: {something1: 12, something2: 25}}).subscribe(canActivate => {
            expect(locationHrefSpy).toHaveBeenCalledWith(environment.APP_URL);
            done();
        });
    });
});
