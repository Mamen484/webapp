import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { Subject } from 'rxjs';
import { takeLast, take } from 'rxjs/operators';
import { FullCountriesListService } from '../../core/services/full-countries-list.service';
import { Country } from '../../core/entities/country';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;

    describe('template rendering', () => {
        let fixture: ComponentFixture<CountryAutocompleteComponent>;
        let countriesListService: jasmine.SpyObj<FullCountriesListService>;
        let valueChanges: Subject<any>;
        let countries: Subject<Country[]>;
        beforeEach(async(() => {
            countriesListService = jasmine.createSpyObj(['getCountries']);
            countries = new Subject();
            countriesListService.getCountries.and.returnValue(countries);
            valueChanges = new Subject();
            TestBed.configureTestingModule({
                declarations: [CountryAutocompleteComponent],
                providers: [{provide: FullCountriesListService, useValue: countriesListService}],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [MatAutocompleteModule]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryAutocompleteComponent);
            component = fixture.componentInstance;
            component.onChange = () => {
            };
            component.controlDir = <any>{control: {valueChanges, setValue: jasmine.createSpy()}};
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should NOT display any country initially if not ISO-alpha-2 value provided.', () => {
            valueChanges.next('France');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code.', () => {
            valueChanges.next('FR');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('France');
        });

        it('should find matching countries on user input.', done => {
            countries.next([
                {code: 'FR', name: 'France', flag: 'fr'},
                {code: 'UK1', name: 'Uk 1', flag: 'uk'},
                {code: 'UK2', name: 'Uk 2', flag: 'uk'},
                {code: 'UK3', name: 'Uk 3', flag: 'uk'},
                {code: 'UK4', name: 'Uk 4', flag: 'uk'},
                {code: 'UK5', name: 'Uk 5', flag: 'uk'},
            ]);
            component.filteredCountries.pipe(take(2), takeLast(1)).subscribe(filteredCountries => {
                expect(filteredCountries[0].code).toEqual('UK1');
                expect(filteredCountries[1].code).toEqual('UK2');
                expect(filteredCountries[2].code).toEqual('UK3');
                expect(filteredCountries[3].code).toEqual('UK4');
                expect(filteredCountries[4].code).toEqual('UK5');
                expect(filteredCountries.length).toEqual(5);
                done();
            });
            valueChanges.next('uk');
        });
    });
});
