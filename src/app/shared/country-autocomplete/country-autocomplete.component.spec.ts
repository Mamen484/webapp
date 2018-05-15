import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
