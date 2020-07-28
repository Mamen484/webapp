import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChannelsRouteGuard } from './channels-route.guard';
import { AppState } from '../entities/app-state';
import { HomepageRouteGuard } from './homepage-route.guard';

describe('ChannelsRouteGuard', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {
        store = jasmine.createSpyObj(['dispatch']);
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store}
            ]
        });
    });

    it('should write `homepage` as the currentRoute value and return true', inject([HomepageRouteGuard], (guard: HomepageRouteGuard) => {
        expect(guard.canActivate()).toEqual(true);
        expect(store.dispatch).toHaveBeenCalledWith( <any>{type: 'SET_ROUTE', routeName: 'homepage'});
    }));

});
