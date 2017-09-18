import { TestBed, async, inject } from '@angular/core/testing';

import { ShopifyGuard } from './shopify.guard';
import { ShopifyAuthentifyService } from '../services/shopify-authentify.service';

describe('ShopifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopifyGuard, {provide: ShopifyAuthentifyService, useValue: {}}]
    });
  });

  it('should ...', inject([ShopifyGuard], (guard: ShopifyGuard) => {
    expect(guard).toBeTruthy();
  }));


});
