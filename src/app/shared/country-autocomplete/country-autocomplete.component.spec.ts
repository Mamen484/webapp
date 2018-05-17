import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { from } from 'rxjs';
import { takeLast } from 'rxjs/operators';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;

    describe('template rendering', () => {
        let fixture: ComponentFixture<CountryAutocompleteComponent>;
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CountryAutocompleteComponent],
                providers: [{provide: LOCALE_ID, useValue: 'en'}],
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
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('isolated spec', () => {
        it('should NOT display any country initially if not ISO-alpha-2 value provided.', () => {
            component = createComponentForLocale('en', ['some non-alpha-2 string']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `en` locale.', () => {
            component = createComponentForLocale('en', ['FR']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('France');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `fr` locale.', () => {
            component = createComponentForLocale('fr', ['NO']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Norvège');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `de` locale.', () => {
            component = createComponentForLocale('de', ['SK']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Slowakei');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `it` locale.', () => {
            component = createComponentForLocale('it', ['LV']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Lettonia');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `it` locale.', () => {
            component = createComponentForLocale('es', ['NL']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Paises Bajos');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `it` locale.', () => {
            component = createComponentForLocale('pt', ['ES']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Espanha');
        });

        it('should display a country that matches provided initially ISO-alpha-2 code for `de` locale.', () => {
            component = createComponentForLocale('de', ['JP']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Japan');
        });

        it('should use an English translation when one for the `fr` locale is missing', () => {
            component = createComponentForLocale('fr', ['SL']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Sierra Leone');
        });

        it('should use an English translation when one for the `it` locale is missing', () => {
            component = createComponentForLocale('it', ['EE']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Estonia');
        });

        it('should use an English translation when one for the `es` locale is missing', () => {
            component = createComponentForLocale('es', ['BG']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('Bulgaria');
        });

        it('should use an English translation when one for the `pt` locale is missing', () => {
            component = createComponentForLocale('pt', ['IN']);
            expect(component.controlDir.control.setValue).toHaveBeenCalledWith('India');
        });

        it('should find matching countries on user input for the `en` locale.', done => {
            component = createComponentForLocale('en', ['', 'po']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('PL');
                expect(countries[1].code).toEqual('PT');
                expect(countries.length).toEqual(2);
                done();
            });
        });

        it('should find matching countries on user input for the `fr` locale.', done => {
            component = createComponentForLocale('fr', ['', 'p']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('NL');
                expect(countries[1].code).toEqual('PL');
                expect(countries[2].code).toEqual('PT');
                expect(countries.length).toEqual(3);
                done();
            });
        });

        it('should find matching countries on user input for the `de` locale.', done => {
            component = createComponentForLocale('de', ['', 've']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('UK');
                expect(countries[1].code).toEqual('US');
                expect(countries.length).toEqual(2);
                done();
            });
        });


        it('should find matching countries on user input for the `it` locale.', done => {
            component = createComponentForLocale('it', ['', 's']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('CH');
                expect(countries[1].code).toEqual('ES');
                expect(countries[2].code).toEqual('SE');
                expect(countries[3].code).toEqual('SI');
                expect(countries[4].code).toEqual('SK');
                expect(countries[5].code).toEqual('SL');
                expect(countries[6].code).toEqual('US');
                expect(countries.length).toEqual(7);
                done();
            });
        });

        it('should find matching countries on user input for the `es` locale.', done => {
            component = createComponentForLocale('es', ['', 'alemani']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('DE');
                expect(countries.length).toEqual(1);
                done();
            });
        });

        it('should find matching countries on user input for the `pt` locale.', done => {
            component = createComponentForLocale('pt', ['', 'Reino Unido da']);
            component.filteredCountries.pipe(takeLast(1)).subscribe(countries => {
                expect(countries[0].code).toEqual('UK');
                expect(countries.length).toEqual(1);
                done();
            });
        });

        it('should use an English translation if the French one doesn`t exist.', () => {
            component = createComponentForLocale('fr');
            expect(component.countries.find(({code}) => code === 'CA').name).toEqual('Canada');
        });

        it('should use an English translation if the German one doesn`t exist.', () => {
            component = createComponentForLocale('de');
            expect(component.countries.find(({code}) => code === 'SL').name).toEqual('Sierra Leone');
        });

        it('should use an English translation if the Italian one doesn`t exist.', () => {
            component = createComponentForLocale('it');
            expect(component.countries.find(({code}) => code === 'AT').name).toEqual('Austria');
        });

        it('should use an English translation if the Spanish one doesn`t exist.', () => {
            component = createComponentForLocale('es');
            expect(component.countries.find(({code}) => code === 'PT').name).toEqual('Portugal');
        });

        it('should use an English translation if the Portuguese one doesn`t exist.', () => {
            component = createComponentForLocale('pt');
            expect(component.countries.find(({code}) => code === 'AU').name).toEqual('Australia');
        });
    });
});

function createComponentForLocale(locale, values = ['']) {
    const component = new CountryAutocompleteComponent(<any>{}, locale);
    component.onChange = () => {};
    component.controlDir = <any>{control: {valueChanges: from(values), setValue: jasmine.createSpy()}};
    component.ngOnInit();
    return component;
}
