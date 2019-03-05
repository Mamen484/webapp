import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { TimelineRouteGuard } from './timeline-route.guard';

describe('TimelineRouteGuard', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {
        store = jasmine.createSpyObj(['dispatch']);
        TestBed.configureTestingModule({
            providers: [
                TimelineRouteGuard,
                {provide: Store, useValue: store}
            ]
        });
    });

    it('should write \'channels\' as the currentRoute value and return true', inject([TimelineRouteGuard], (guard: TimelineRouteGuard) => {
        expect(guard.canActivate()).toEqual(true);
        expect(store.dispatch).toHaveBeenCalledWith({type: 'SET_ROUTE', routeName: 'timeline'});
    }));

});
