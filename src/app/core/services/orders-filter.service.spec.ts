import { TestBed, inject } from '@angular/core/testing';

import { OrdersFilterService } from './orders-filter.service';
import { OrdersFilter } from '../entities/orders-filter';
import { take } from 'rxjs/operators';

describe('OrdersFilterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OrdersFilterService]
        });
    });

    it('should be created', inject([OrdersFilterService], (service: OrdersFilterService) => {
        expect(service).toBeTruthy();
    }));

    it('should NOT mutate the data of the filter when it is modified by another subscriber', inject([OrdersFilterService], (service: OrdersFilterService) => {
        let subscriber1 = service.getFilter();
        let subscriber2 = service.getFilter();

        let filter = new OrdersFilter();
        expect(filter.search).toEqual('');
        service.setFilter(filter);
        subscriber1.subscribe(f => f.search = 'some search string');
        subscriber2.subscribe(f => expect(f.search).toEqual(''));
    }));

    it('should change specified property on patchFilter() call', inject([OrdersFilterService], (service: OrdersFilterService) => {
        let subscriber = service.getFilter();

        let filter = new OrdersFilter();
        filter.search = '1';
        filter.tag = '2';
        service.setFilter(filter);
        subscriber.pipe(take(1)).subscribe(f => {
            expect(f.search).toEqual('1');
            expect(f.tag).toEqual('2');
        });
        service.patchFilter('search', '4');
        subscriber.pipe(take(1)).subscribe(f => {
            expect(f.search).toEqual('4');
            expect(f.tag).toEqual('2');
        });
        service.patchFilter('tag', '8');
        subscriber.pipe(take(1)).subscribe(f => {
            expect(f.search).toEqual('4');
            expect(f.tag).toEqual('8');
        });
    }));
});
