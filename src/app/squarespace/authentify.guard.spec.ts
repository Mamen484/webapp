import { inject, TestBed } from '@angular/core/testing';

import { AuthentifyGuard } from './authentify.guard';
import { SquarespaceService } from './squarespace.service';
import { SflLocalStorageService, SflWindowRefService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';
import { LocalStorageKey } from '../core/entities/local-storage-key.enum';

describe('AuthentifyGuard', () => {
    let squarespaceService: jasmine.SpyObj<SquarespaceService>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;

    beforeEach(() => {
        squarespaceService = jasmine.createSpyObj('SquarespaceService spy', ['auth']);
        localStorage = jasmine.createSpyObj('LocalStorage spy', ['setItem']);
        TestBed.configureTestingModule({
            providers: [
                AuthentifyGuard,
                {provide: SquarespaceService, useValue: squarespaceService},
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: SflWindowRefService, useValue: {nativeWindow: {location: {}}}},
            ],
        });
    });

    it('should call squarespaceService.auth', inject([AuthentifyGuard], async (guard: AuthentifyGuard) => {
        squarespaceService.auth.and.returnValue(EMPTY);
        guard.canActivate(<any>{}).subscribe();
        expect(squarespaceService.auth).toHaveBeenCalledWith();
    }));

    it('should save state to localStorage', inject([AuthentifyGuard], async (guard: AuthentifyGuard) => {
        squarespaceService.auth.and.returnValue(of({
            authorizeUrl: 'https://login.squarespace.com/api/1/login/oauth/provider/authorize?client_id=key&redirect_uri=https%3A%2F%2Fapp.shopping-feed.com%2Fv3%2Fen%2Fregister&scope=website.%2A&state=9aa6752ea256e54839832fb882c0133d961512102b246c1b8da2048cd57fdd402486e3c0bc1121a8&access_type=offline&website_id=my-store'
        }));
        guard.canActivate(<any>{}).subscribe();
        expect(localStorage.setItem).toHaveBeenCalledWith(LocalStorageKey.squarespaceState, '9aa6752ea256e54839832fb882c0133d961512102b246c1b8da2048cd57fdd402486e3c0bc1121a8');
    }));

    it('should redirect to authorizeUrl', inject([AuthentifyGuard], async (guard: AuthentifyGuard) => {
        squarespaceService.auth.and.returnValue(of({authorizeUrl: 'https://app.shopping-feed.com?state=state'}));
        const windowRef = TestBed.get(SflWindowRefService);
        guard.canActivate(<any>{}).subscribe();
        expect(windowRef.nativeWindow.location.href).toBe('https://app.shopping-feed.com?state=state');
    }));
});
