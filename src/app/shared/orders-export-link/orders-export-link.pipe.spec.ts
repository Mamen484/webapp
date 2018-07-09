import { OrdersExportLinkPipe } from './orders-export-link.pipe';
import { Order } from '../../core/entities/orders/order';

describe('OrdersExportLinkPipe', () => {

    let pipe: OrdersExportLinkPipe;

    beforeEach(() => {
        pipe = new OrdersExportLinkPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should create correct params for a link to export orders csv', () => {
        let value = pipe.transform(<Order[]>[{id: 3389435486}, {id: 3389435484}], 1234);
        expect(value).toEqual('/Marketplaces/exportOrder?list_order[]=3389435486&list_order[]=3389435484&id_export=1234&order_unit=false');
    });
});

