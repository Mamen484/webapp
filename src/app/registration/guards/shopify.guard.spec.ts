import { ShopifyGuard } from './shopify.guard';
import { of } from 'rxjs';

describe('ShopifyGuard', () => {
    let guard;
    let windowRef;
    let shopifyService;
    beforeEach(() => {
        windowRef = {nativeWindow: {location: {href: ''}}};
        shopifyService = jasmine.createSpyObj('ShopifyAuthentifyService', ['getAuthorizationUrl']);

        guard = new ShopifyGuard(shopifyService, windowRef);
    });

    it('should redirect to shopify app if the shop query param is not specified', () => {
        guard.canActivate({queryParams: {}});
        expect(windowRef.nativeWindow.location.href).toEqual('https://apps.shopify.com/shopping-feed-dev');
    });

    it('should get the url from server and redirect to it if the shop query param is specified but code query param is NOT specified', () => {
        shopifyService.getAuthorizationUrl.and.returnValue(of('some url'));
        guard.canActivate({queryParams: {shop: '121'}});
        expect(shopifyService.getAuthorizationUrl).toHaveBeenCalledWith('121');
        expect(windowRef.nativeWindow.location.href).toEqual('some url');
    });

    it('canActivate should always return false', () => {
        shopifyService.getAuthorizationUrl.and.returnValue(of('some url'));

        expect(guard.canActivate({queryParams: {}})).toEqual(false);
        expect(guard.canActivate({queryParams: {shop: '121'}})).toEqual(false);
    });
});
