import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SflCountrySelectComponent } from './country-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FullCountriesListService } from 'sfl-shared/services';

describe('SflCountrySelectComponent', () => {
    let fixture: ComponentFixture<SflCountrySelectComponent>;
    let component: SflCountrySelectComponent;
    let countriesListService: jasmine.SpyObj<FullCountriesListService>;
    beforeEach(() => {
        countriesListService = jasmine.createSpyObj('FullCountriesListService', ['getCountries']);
        TestBed.configureTestingModule({
            declarations: [SflCountrySelectComponent],
            providers: [
                {provide: FullCountriesListService, useValue: countriesListService},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(SflCountrySelectComponent);
        component = fixture.componentInstance;
    });

    it('should assign countries with allowed codes', () => {

    });

    it('should assign onChange on registerOnChange call', () => {
        component.registerOnChange(() => {
        });
        expect(component.onChange).toBeDefined();
    });

    it('should assign onTouched on registerOnTouched call', () => {
        component.registerOnTouched(() => {
        });
        expect(component.onTouched).toBeDefined();
    });

    it('should write a select value on writeValue call', () => {
        component.writeValue('some value');
        expect(component.select.value).toBe('some value');
    });
});

describe('SflCountrySelectComponent value accessor', () => {
    it('should write valueAccessor property', () => {
        let component = new SflCountrySelectComponent(<any>{}, 'baseHref', 'en');
        expect(component.controlDir.valueAccessor).toBe(component);
    });
});