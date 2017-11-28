import { ShopifyGuard } from './shopify.guard';
import { Observable } from 'rxjs/Observable';

describe('ShopifyGuard', () => {
    let guard;
    let localStorage;
    let windowRef;
    let shopifyService;
    beforeEach(() => {
        localStorage = jasmine.createSpyObj('LocalStorage', ['removeItem']);
        windowRef = {nativeWindow: {location: {href: ''}}};
        shopifyService = jasmine.createSpyObj('ShopifyAuthentifyService', ['getAuthorizationUrl']);

        guard = new ShopifyGuard(shopifyService, localStorage, windowRef);
    });

    it('should remove registration data from the local storage on activate', () => {
        guard.canActivate({queryParams: {}});
        expect(localStorage.removeItem).toHaveBeenCalledWith('sf.registration');
    });

    it('should redirect to shopify app if the shop query param is not specified', () => {
        guard.canActivate({queryParams: {}});
        expect(windowRef.nativeWindow.location.href).toEqual('https://apps.shopify.com/shopping-feed-dev');
    });

    it('should get the url from server and redirect to it if the shop query param is specified but code query param is NOT specified', () => {
        shopifyService.getAuthorizationUrl.and.returnValue(Observable.of('some url'));
        guard.canActivate({queryParams: {shop: '121'}});
        expect(shopifyService.getAuthorizationUrl).toHaveBeenCalledWith('121');
        expect(windowRef.nativeWindow.location.href).toEqual('some url');
    });

    it('canActivate should always return false', () => {
        shopifyService.getAuthorizationUrl.and.returnValue(Observable.of('some url'));

        expect(guard.canActivate({queryParams: {}})).toEqual(false);
        expect(guard.canActivate({queryParams: {shop: '121'}})).toEqual(false);
    });
});