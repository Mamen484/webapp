import { TestBed } from '@angular/core/testing';

import { HasErrorGuard } from './has-error.guard';
import { SflLocalStorageService } from 'sfl-shared/services';
import { Router } from '@angular/router';

describe('HasErrorGuard', () => {

    let guard: HasErrorGuard;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        localStorage = jasmine.createSpyObj('LocalStorage spy', ['getItem']);
        router = jasmine.createSpyObj('Router spy', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                HasErrorGuard,
                {provide: SflLocalStorageService, useValue: localStorage},
                {provide: Router, useValue: router},
            ],
        });
    });

    beforeEach(() => {
        guard = TestBed.get(HasErrorGuard);
    });

    it('should navigate to an error page when an error param exists', () => {
        localStorage.getItem.and.returnValue('some state');
        const canActivate = guard.canActivate(<any>{queryParamMap: new Map().set('state', 'some state').set('error', '1')});
        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
        expect(canActivate).toBe(false);
    });

    it('should navigate to an error page when no state stored to local storage', () => {
        localStorage.getItem.and.returnValue('');
        const canActivate = guard.canActivate(<any>{queryParamMap: new Map().set('state', 'some state')});
        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
        expect(canActivate).toBe(false);
    });

    it('should navigate to an error page when state saved to local storage does not equal to state from params', () => {
        localStorage.getItem.and.returnValue('some state');
        const canActivate = guard.canActivate(<any>{queryParamMap: new Map().set('state', 'some another state')});
        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
        expect(canActivate).toBe(false);
    });

    it('should return true and not redirect to an error page when no error in params and state from local storage equals the state from query params', () => {
        localStorage.getItem.and.returnValue('some state');
        const canActivate = guard.canActivate(<any>{queryParamMap: new Map().set('state', 'some state')});
        expect(router.navigate).not.toHaveBeenCalled();
        expect(canActivate).toBe(true);
    });
});
