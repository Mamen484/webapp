import { TestBed, inject } from '@angular/core/testing';
import { CheckProperLocaleGuard } from './check-proper-locale.guard';
import { of } from 'rxjs';
import { SflLocaleIdService } from 'sfl-shared';
import { environment } from '../../../environments/environment';
import { SflWindowRefService } from 'sfl-shared';
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
                    {provide: SflLocaleIdService, useValue: {localeId: 'it'}},
                    {provide: SflWindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: Store, useValue: appStore},
                    Location,
                ]
            });
        });

        it('should return true', inject([CheckProperLocaleGuard], (guard: CheckProperLocaleGuard) => {
            appStore.select.and.returnValue(of({language: 'it'}));
            environment.production = 'true';
            guard.canActivate().subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            })
        }));
    });

    describe('different locales in the /me response and the localization of the project', () => {
        let locationSpy: jasmine.SpyObj<Location>;
        beforeEach(() => {
            locationSpy = jasmine.createSpyObj(['path']);
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: SflLocaleIdService, useValue: {localeId: 'it'}},
                    {provide: SflWindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: Location, useValue: locationSpy},
                    {provide: Store, useValue: appStore},
                ]
            });
        });

        it('should redirect the user to the valid localization folder and return false',
            inject([CheckProperLocaleGuard, SflWindowRefService], (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                environment.production = 'true';
                appStore.select.and.returnValue(of({language: 'en-US'}));
                locationSpy.path.and.returnValue('');
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/');
                    expect(canActivate).toEqual(false);
                })
            }));

        it('should add a slash before the whole path if it doesn\'t exist to prevent extra redirects on the server',
            inject([CheckProperLocaleGuard, SflWindowRefService], (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                environment.production = 'true';
                appStore.select.and.returnValue(of({language: 'en-US'}));
                locationSpy.path.and.returnValue('?store=307');
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/?store=307');
                    expect(canActivate).toEqual(false);
                })
            }));

        it('should NOT add a slash before the whole path if it starts from the slash',
            inject([CheckProperLocaleGuard, SflWindowRefService], (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                environment.production = 'true';
                appStore.select.and.returnValue(of({language: 'en-US'}));
                locationSpy.path.and.returnValue('/?store=307');
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/?store=307');
                    expect(canActivate).toEqual(false);
                })
            }));
    });
});
