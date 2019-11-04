import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { TicketsRouteGuard } from './tickets-route.guard';

describe('TicketsRouteGuard', () => {
  let store: jasmine.SpyObj<Store<AppState>>;
  beforeEach(() => {
    store = jasmine.createSpyObj(['dispatch']);
    TestBed.configureTestingModule({
      providers: [
          TicketsRouteGuard,
          {provide: Store, useValue: store}
      ]
    });
  });

  it('should write `api` as the currentRoute value and return true', inject([TicketsRouteGuard], (guard: TicketsRouteGuard) => {
    expect(guard.canActivate()).toEqual(true);
    expect(store.dispatch).toHaveBeenCalledWith(<any>{type: 'SET_ROUTE', routeName: 'api'});
  }));

});
