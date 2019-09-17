import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeLast } from 'rxjs/operators';
import { FullCountriesListService } from './full-countries-list.service';
import { Country, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;

    describe('template rendering', () => {
        let fixture: ComponentFixture<CountryAutocompleteComponent>;
        let countriesListService: jasmine.SpyObj<FullCountriesListService>;
        let valueChanges: BehaviorSubject<any>;
        let countries: Subject<Country[]>;
        beforeEach(async(() => {
            countriesListService = jasmine.createSpyObj(['getCountries']);
            countries = new Subject();
            countriesListService.getCountries.and.returnValue(countries);
            valueChanges = new BehaviorSubject<any>('');
            TestBed.configureTestingModule({
                declarations: [CountryAutocompleteComponent],
                providers: [
                    {provide: FullCountriesListService, useValue: countriesListService},
                    {provide: SFL_COUNTRIES_LIST_LINK, useValue: 'countriesLink'},
                ],
                schemas: [NO_ERRORS_SCHEMA],
                imports: [MatAutocompleteModule]
            })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryAutocompleteComponent);
            component = fixture.componentInstance;
            component.control = <any>{
                valueChanges,
                setValue: jasmine.createSpy(),
                hasError: () => jasmine.createSpy(),
                getError: jasmine.createSpy()
            };
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should NOT display any country initially if not ISO-alpha-2 value provided.', () => {
            fixture.detectChanges();
            component.writeValue('France');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.control.setValue).toHaveBeenCalledWith('');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code.', () => {
            fixture.detectChanges();
            component.writeValue('FR');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.control.setValue).toHaveBeenCalledWith('France');
        });

        it('should find matching countries on user input.', async () => {
            fixture.detectChanges();
            countries.next([
                {code: 'FR', name: 'France', flag: 'fr'},
                {code: 'UK1', name: 'Uk 1', flag: 'uk'},
                {code: 'UK2', name: 'Uk 2', flag: 'uk'},
                {code: 'UK3', name: 'Uk 3', flag: 'uk'},
                {code: 'UK4', name: 'Uk 4', flag: 'uk'},
                {code: 'UK5', name: 'Uk 5', flag: 'uk'},
            ]);

            valueChanges.next('uk');

            let filteredCountries = await component.filteredCountries.pipe(take(2), takeLast(1)).toPromise();

            expect(filteredCountries[0].code).toEqual('UK1');
            expect(filteredCountries[1].code).toEqual('UK2');
            expect(filteredCountries[2].code).toEqual('UK3');
            expect(filteredCountries[3].code).toEqual('UK4');
            expect(filteredCountries[4].code).toEqual('UK5');
            expect(filteredCountries.length).toEqual(5);
        });

        it('should initialize all countries if no allowedCodes specified', async () => {
            component.allowedCodes = undefined;
            fixture.detectChanges();
            countries.next([
                {code: 'FR', name: 'France', flag: 'fr'},
                {code: 'UK1', name: 'Uk 1', flag: 'uk'},
                {code: 'UK2', name: 'Uk 2', flag: 'uk'},
                {code: 'UK3', name: 'Uk 3', flag: 'uk'},
                {code: 'UK4', name: 'Uk 4', flag: 'uk'},
                {code: 'UK5', name: 'Uk 5', flag: 'uk'},
            ]);
            expect(component.countries.length).toBe(6);
        });

        it('should initialize only from allowedCodes when it is specified', async () => {
            component.allowedCodes = ['fr', 'uk3'];
            fixture.detectChanges();
            countries.next([
                {code: 'FR', name: 'France', flag: 'fr'},
                {code: 'UK1', name: 'Uk 1', flag: 'uk'},
                {code: 'UK2', name: 'Uk 2', flag: 'uk'},
                {code: 'UK3', name: 'Uk 3', flag: 'uk'},
                {code: 'UK4', name: 'Uk 4', flag: 'uk'},
                {code: 'UK5', name: 'Uk 5', flag: 'uk'},
            ]);
            expect(component.countries).toEqual([
                {code: 'FR', name: 'France', flag: 'fr'},
                {code: 'UK3', name: 'Uk 3', flag: 'uk'},
            ]);
        });
    });
});
