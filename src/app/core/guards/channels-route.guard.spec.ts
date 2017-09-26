import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ChannelsRouteGuard } from './channels-route.guard';

describe('ChannelsRouteGuard', () => {
    let dispatchSpy: jasmine.Spy;
    beforeEach(() => {
        dispatchSpy = jasmine.createSpy('dispatch');
        TestBed.configureTestingModule({
            providers: [
                ChannelsRouteGuard,
                {provide: Store, useValue: {select: () => ({dispatch: dispatchSpy})}}
            ]
        });
    });

    it('should write \'channels\' as the currentRoute value and return true', inject([ChannelsRouteGuard], (guard: ChannelsRouteGuard) => {
        expect(guard.canLoad()).toEqual(true);
        expect(dispatchSpy.calls.first().args[0].type).toEqual('SET_ROUTE');
        expect(dispatchSpy.calls.first().args[0].routeName).toEqual('channels');
    }));

});
