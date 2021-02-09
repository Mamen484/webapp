import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SftCountrySelectComponent } from './country-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FullCountriesListService } from 'sfl-shared/services';
import { SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';
import { of } from 'rxjs';

describe('SflCountrySelectComponent', () => {
    let fixture: ComponentFixture<SftCountrySelectComponent>;
    let component: SftCountrySelectComponent;
    let countriesListService: jasmine.SpyObj<FullCountriesListService>;
    beforeEach(() => {
        countriesListService = jasmine.createSpyObj('FullCountriesListService', ['getCountries']);
        TestBed.configureTestingModule({
            declarations: [SftCountrySelectComponent],
            providers: [
                {provide: FullCountriesListService, useValue: countriesListService},
                {provide: SFL_COUNTRIES_LIST_LINK, useValue: 'someLink'},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(SftCountrySelectComponent);
        component = fixture.componentInstance;
    });

    it('should assign countries with allowed codes', () => {
        countriesListService.getCountries.and.returnValue(of([
            {code: 'au'}, {code: 'bg'}, {code: 'zz1'}, {code: 'zz2'},
        ]));
        component.ngOnInit();
        expect(component.countries).toEqual([{code: 'au'}, {code: 'bg'}]);
    });

    it('should assign all countries if there are no allowed codes', () => {
        countriesListService.getCountries.and.returnValue(of([
            {code: 'au'}, {code: 'bg'}, {code: 'zz1'}, {code: 'zz2'},
        ]));
        component.allowedCodes = undefined;
        component.ngOnInit();
        expect(component.countries).toEqual([{code: 'au'}, {code: 'bg'}, {code: 'zz1'}, {code: 'zz2'}]);
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
        let component = new SftCountrySelectComponent(<any>{}, 'baseHref', <any>{});
        expect(component.controlDir.valueAccessor).toBe(component);
    });
});
