import { TestBed, inject } from '@angular/core/testing';
import { OrdersRouteGuard } from './orders-route.guard';
import { Store } from '@ngrx/store';

describe('OrdersRouteGuard', () => {
  let dispatchSpy: jasmine.Spy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
    TestBed.configureTestingModule({
      providers: [
          OrdersRouteGuard,
          {provide: Store, useValue: {select: () => ({dispatch: dispatchSpy})}}
      ]
    });
  });

  it('should write \'orders\' as the currentRoute value and return true', inject([OrdersRouteGuard], (guard: OrdersRouteGuard) => {
    expect(guard.canLoad()).toEqual(true);
    expect(dispatchSpy.calls.first().args[0].type).toEqual('SET_ROUTE');
    expect(dispatchSpy.calls.first().args[0].routeName).toEqual('orders');
  }));

});
