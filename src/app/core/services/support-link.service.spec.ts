import { SupportLinkService } from './support-link.service';

describe('SupportLinkService', () => {
    let service: SupportLinkService;
    it('should create a proper link for a english locale', () => {
        service = new SupportLinkService('en');
        expect(service.supportLink).toEqual('https://shoppingfeed.zendesk.com/hc/en-us')
    });

    it('should create a proper link for a french locale', () => {
        service = new SupportLinkService('fr');
        expect(service.supportLink).toEqual('https://shoppingfeed.zendesk.com/hc/fr')
    });

    it('should create a proper link for a spanish locale', () => {
        service = new SupportLinkService('es');
        expect(service.supportLink).toEqual('https://shoppingfeed.zendesk.com/hc/es')
    });

    it('should create a proper link for an italian locale', () => {
        service = new SupportLinkService('it');
        expect(service.supportLink).toEqual('https://shoppingfeed.zendesk.com/hc/it')
    });
});
