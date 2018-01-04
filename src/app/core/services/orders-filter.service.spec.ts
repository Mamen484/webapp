import { TestBed, inject } from '@angular/core/testing';

import { OrdersFilterService } from './orders-filter.service';

describe('OrdersFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersFilterService]
    });
  });

  it('should be created', inject([OrdersFilterService], (service: OrdersFilterService) => {
    expect(service).toBeTruthy();
  }));
});
