import { TestBed, inject } from '@angular/core/testing';
import { OrdersRouteGuard } from './orders-route.guard';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

describe('OrdersRouteGuard', () => {
  let store: jasmine.SpyObj<Store<AppState>>;
  beforeEach(() => {
    store = jasmine.createSpyObj(['dispatch']);
    TestBed.configureTestingModule({
      providers: [
          OrdersRouteGuard,
          {provide: Store, useValue: store}
      ]
    });
  });

  it('should write `orders` as the currentRoute value and return true', inject([OrdersRouteGuard], (guard: OrdersRouteGuard) => {
    expect(guard.canActivate()).toEqual(true);
    expect(store.dispatch).toHaveBeenCalledWith(<any>{type: 'SET_ROUTE', routeName: 'orders'});
  }));

});
