import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { of, Subject } from 'rxjs';
import { FullCountriesListService } from 'sfl-shared/services';
import { Country, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;

    describe('template rendering', () => {
        let fixture: ComponentFixture<CountryAutocompleteComponent>;
        let countriesListService: jasmine.SpyObj<FullCountriesListService>;
        let countries: Subject<Country[]>;
        beforeEach(async(() => {
            countriesListService = jasmine.createSpyObj(['getCountries']);
            countries = new Subject();
            countriesListService.getCountries.and.returnValue(countries);
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
            component.input = <any>{nativeElement: {}};
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should NOT display any country initially if not ISO-alpha-2 value provided', () => {
            fixture.detectChanges();
            component.writeValue('France');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.control.value).toBe('')
        });

        it('should display a country that matches provided initially ISO-alpha-2 code', () => {
            fixture.detectChanges();
            component.writeValue('FR');
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.control.value).toBe('France');
        });

        it('should not write control value if the passed to writeValue() is empty', () => {
            fixture.detectChanges();
            component.control.setValue('SF');
            component.writeValue('');
            expect(component.control.value).toBe('SF');
        });

        it('should write selectedCountries if the value passed to writeValue() is an array', () => {
            fixture.detectChanges();
            component.writeValue(['FR']);
            countries.next([{code: 'FR', name: 'France', flag: 'fr'}]);
            expect(component.selectedCountries.length).toEqual(1);
            expect(component.selectedCountries[0].code).toEqual('FR');
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

            component.control.setValue('uk');

            expect(component.filteredCountries[0].code).toEqual('UK1');
            expect(component.filteredCountries[1].code).toEqual('UK2');
            expect(component.filteredCountries[2].code).toEqual('UK3');
            expect(component.filteredCountries[3].code).toEqual('UK4');
            expect(component.filteredCountries[4].code).toEqual('UK5');
            expect(component.filteredCountries.length).toEqual(5);
        });

        it('should initialize all countries if no allowedCodes specified', () => {
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

        it('should initialize only from allowedCodes when it is specified', () => {
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

        it('should call onChange() when user selects a country and multipleSelection is not allowed', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.multipleSelection = 'none';
            countriesListService.getCountries.and.returnValue(of([<any>{name: 'someCountry', code: '1231'}]));
            component.optionSelected(<any>{option: {value: 'someCountry'}});
            expect(component.onChange).toHaveBeenCalledWith('1231');
        });

        it('should NOT call onChange() when user selects a country that is not in getCountries() list', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.multipleSelection = 'none';
            countriesListService.getCountries.and.returnValue(of([<any>{name: 'someDifferentCountry', code: '1231'}]));
            component.optionSelected(<any>{option: {value: 'someCountry'}});
            expect(component.onChange).not.toHaveBeenCalled();
        });

        it('should call onChange() when user selects a country and multipleSelection is allowed', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.multipleSelection = 'chips';
            countriesListService.getCountries.and.returnValue(of([<any>{name: 'someCountry', code: '1231'}]));
            component.optionSelected(<any>{option: {value: 'someCountry'}});
            expect(component.onChange).toHaveBeenCalledWith(['1231']);
        });

        it('should call onChange() with all selected countries when multipleSelection is allowed', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.multipleSelection = 'chips';
            countriesListService.getCountries.and.returnValue(of(<any>[
                {name: 'someCountry1', code: '1231'},
                {name: 'someCountry2', code: '1232'},
                {name: 'someCountry3', code: '1233'},
                {name: 'someCountry4', code: '1234'},
            ]));
            component.optionSelected(<any>{option: {value: 'someCountry1'}});
            component.optionSelected(<any>{option: {value: 'someCountry3'}});
            component.optionSelected(<any>{option: {value: 'someCountry4'}});
            expect(component.onChange).toHaveBeenCalledWith(['1231', '1233', '1234']);
        });

        it('should add one country twice', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.multipleSelection = 'chips';
            countriesListService.getCountries.and.returnValue(of(<any>[
                {name: 'someCountry1', code: '1231'},
            ]));
            component.optionSelected(<any>{option: {value: 'someCountry1'}});
            component.optionSelected(<any>{option: {value: 'someCountry1'}});
            expect(component.onChange).toHaveBeenCalledWith(['1231']);
        });

        it('should remove a country from selectedCountries list and notify the subscribers about that on remove() call', () => {
            component.onChange = jasmine.createSpy('onChange()');
            component.selectedCountries = [{code: '1231'}, {code: '1233'}, {code: '1235'}, {code: '1237'}];
            component.remove(component.selectedCountries[1]);
            expect(component.onChange).toHaveBeenCalledWith(['1231', '1235', '1237']);
        });

        it('should set the server on control when serverError set', () => {
            component.serverError = 'some server error';
            fixture.detectChanges();
            component.control.updateValueAndValidity();
            expect(component.control.hasError('serverError')).toBe(true);
            expect(component.control.getError('serverError')).toBe('some server error');
        });

        it('should have a required error if control doesn`t have a value and multiple selection is disallowed', () => {
            component.required = true;
            component.multipleSelection = 'none';
            component.control.setValue('');
            fixture.detectChanges();
            component.control.updateValueAndValidity();
            expect(component.control.hasError('required')).toBe(true);
        });

        it('should have a multipleRequired error if there are no selected countries and multiple selection is allowed', () => {
            component.required = true;
            component.multipleSelection = 'chips';
            component.control.setValue('');
            component.selectedCountries = [];
            fixture.detectChanges();
            component.control.updateValueAndValidity();
            expect(component.control.hasError('multipleRequired')).toBe(true);
        });

        it('should NOT have a multipleRequired error if there are selected countries and multiple selection is allowed', () => {
            component.required = true;
            component.multipleSelection = 'chips';
            component.control.setValue('');
            component.selectedCountries = [<any>{code: 'FR'}];
            fixture.detectChanges();
            component.control.updateValueAndValidity();
            expect(component.control.hasError('multipleRequired')).toBe(false);
        });

        it('should add errorState=true to chipList when multiple selection is allowed and control is invalid', () => {
            component.required = true;
            component.multipleSelection = 'chips';
            component.control.setValue('');
            component.selectedCountries = [];
            fixture.detectChanges();
            component.control.updateValueAndValidity();
            expect(component.chipList.errorState).toBe(true);
        });

        it('should write onChange on registerOnChangeCall', () => {
            const func = () => {
            };
            component.registerOnChange(func);
            expect(component.onChange).toBe(func);
        });

        it('should return nothing on registerOnTouched() call', () => {
            expect(component.registerOnTouched(() => {
            })).toBeFalsy();
        });

    });
});
