import { TestBed } from '@angular/core/testing';

import { ConnectedChannelsGuard } from './connected-channels.guard';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { SET_ROUTE } from 'sfl-shared/reducers';

describe('ConnectedChannelsGuard', () => {
    let guard: ConnectedChannelsGuard;
    let store: jasmine.SpyObj<Store<AppState>>;

    beforeEach(() => {
        store = jasmine.createSpyObj(['select', 'dispatch']);
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store},
            ]
        });
        guard = TestBed.inject(ConnectedChannelsGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should dispatch the channels route on activate', () => {
        guard.canActivate(<any>{}, <any>{});
        expect(store.dispatch).toHaveBeenCalledWith(<any>{
            type: SET_ROUTE,
            route: {menuName: 'channels', pageName: 'connected-channels'}
        });
    });
});
