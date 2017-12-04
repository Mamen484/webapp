import { TestBed, inject } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrdersService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OrdersService],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([OrdersService], (service: OrdersService) => {
        expect(service).toBeTruthy();
    }));
});
