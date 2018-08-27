import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChannelsRouteGuard } from './channels-route.guard';
import { AppState } from '../entities/app-state';

describe('ChannelsRouteGuard', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {
        store = jasmine.createSpyObj(['dispatch']);
        TestBed.configureTestingModule({
            providers: [
                ChannelsRouteGuard,
                {provide: Store, useValue: store}
            ]
        });
    });

    it('should write \'channels\' as the currentRoute value and return true', inject([ChannelsRouteGuard], (guard: ChannelsRouteGuard) => {
        expect(guard.canLoad()).toEqual(true);
        expect(store.dispatch).toHaveBeenCalledWith( {type: 'SET_ROUTE', routeName: 'channels'});
    }));

});
