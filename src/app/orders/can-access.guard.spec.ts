import { TestBed } from '@angular/core/testing';

import { CanAccessGuard } from './can-access.guard';
import { AppState } from '../core/entities/app-state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('CanAccessGuard', () => {
    let guard: CanAccessGuard;
    let store: jasmine.SpyObj<Store<AppState>>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        store = jasmine.createSpyObj(['select']);
        router = jasmine.createSpyObj(['navigate']);
        TestBed.configureTestingModule({
            providers: [
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
            ],
        });
        guard = TestBed.inject(CanAccessGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true if a user has marketplaces permission', async () => {
        store.select.and.returnValue(of({permission: {marketplaces: '*'}}));
        expect(await guard.canActivate(<any>{}, <any>{}).toPromise()).toBe(true);
    });

  it('should return false if a user has no marketplaces permission', async () => {
    store.select.and.returnValue(of({permission: {}}));
    expect(await guard.canActivate(<any>{}, <any>{}).toPromise()).toBe(false);
  });

    it('should redirect to no-access page if a user has NO marketplaces permission', async () => {
        store.select.and.returnValue(of({permission: {}}));
        guard.canActivate(<any>{}, <any>{}).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['/no-access']);
    });

    it('should NOT redirect to no-access page if a user has marketplaces permission', async () => {
        store.select.and.returnValue(of({permission: {marketplaces: '*'}}));
        guard.canActivate(<any>{}, <any>{}).subscribe();
        expect(router.navigate).not.toHaveBeenCalledWith(['/no-access']);
    });
});
