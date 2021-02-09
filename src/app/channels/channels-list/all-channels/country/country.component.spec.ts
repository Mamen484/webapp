import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryComponent } from './country.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/entities/app-state';
import { FullCountriesListService } from 'sfl-shared/services';
import { EMPTY, of } from 'rxjs';

describe('CountryComponent', () => {
    let component: CountryComponent;
    let fixture: ComponentFixture<CountryComponent>;
    let store: jasmine.SpyObj<Store<AppState>>;
    let countriesListService: jasmine.SpyObj<FullCountriesListService>;

    beforeEach(async () => {
        store = jasmine.createSpyObj(['select']);
        countriesListService = jasmine.createSpyObj(['getCountries']);
        await TestBed.configureTestingModule({
            declarations: [CountryComponent],
            providers: [
                {provide: Store, useValue: store},
                {provide: FullCountriesListService, useValue: countriesListService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the storeCountry', () => {
        component.defaultCountry = 'us';
        store.select.and.returnValue(of({country: 'fr'}));
        countriesListService.getCountries.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.storeCountry).toBe('fr');
    });

    it('should set the countriesList', () => {
        component.defaultCountry = 'us';
        component.storeCountry = 'us';
        store.select.and.returnValue(EMPTY);
        countriesListService.getCountries.and.returnValue(of([{code: 'FR'}, {code: 'UK'}]));
        fixture.detectChanges();
        expect(component.fullCountriesList).toEqual([{code: 'fr'}, {code: 'uk'}]);
    });
});
