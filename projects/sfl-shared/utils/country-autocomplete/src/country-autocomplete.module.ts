import { ModuleWithProviders, NgModule } from '@angular/core';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    declarations: [CountryAutocompleteComponent],
    exports: [CountryAutocompleteComponent],
})
export class SflCountryAutocompleteModule {
    static forRoot(dependency: { sflCountriesListLink }): ModuleWithProviders {
        return {
            ngModule: SflCountryAutocompleteModule,
            providers: [
                {provide: SFL_COUNTRIES_LIST_LINK, useValue: dependency.sflCountriesListLink},
            ]
        }
    }
}
