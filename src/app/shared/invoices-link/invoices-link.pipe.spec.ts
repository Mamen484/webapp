import { InvoicesLinkPipe } from './invoices-link.pipe';
import { Order } from '../../core/entities/orders/order';

describe('InvoicesLinkPipe', () => {

    let pipe: InvoicesLinkPipe;

    beforeEach(() => {
        pipe = new InvoicesLinkPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should create correct params for a link to export orders pdf', () => {
        const value = pipe.transform([<Order>{id: 3389435486}, <Order>{id: 3389435484}]);
        expect(value).toEqual('/Marketplaces/exportOrderPdf?list_order[]=3389435486&list_order[]=3389435484');
    });

});
