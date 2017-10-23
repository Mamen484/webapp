import { TestBed, inject } from '@angular/core/testing';
import { CheckProperLocaleGuard } from './check-proper-locale.guard';
import { Observable } from 'rxjs/Observable';
import { LocaleIdService } from '../services/locale-id.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import createSpyObj = jasmine.createSpyObj;
import { Store } from '@ngrx/store';

describe('CheckProperLocaleGuard', () => {
    let appStore = createSpyObj('Store', ['select']);


    describe('the same locale in the /me response and the localization of the project', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: LocaleIdService, useValue: {localeId: 'it'}},
                    {provide: WindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: Store, useValue: appStore},
                    Location,
                ]
            });
        });

        it('should return true', inject([CheckProperLocaleGuard], (guard: CheckProperLocaleGuard) => {
            appStore.select.and.returnValue(Observable.of({language: 'it'}));
            environment.production = 'true';
            guard.canActivate().subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            })
        }));

        it('should redirect the user to the valid localization folder and return false',
            inject([CheckProperLocaleGuard, WindowRefService], (guard: CheckProperLocaleGuard, windowRef: WindowRefService) => {
                appStore.select.and.returnValue(Observable.of({language: 'en_US'}));
                environment.production = 'true';
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en');
                    expect(canActivate).toEqual(false);
                })
            }));
    });
});
