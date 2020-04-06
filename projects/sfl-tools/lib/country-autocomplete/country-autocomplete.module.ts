import { ModuleWithProviders, NgModule } from '@angular/core';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';
import { FullCountriesListService } from 'sfl-shared/services';

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
    providers: [FullCountriesListService],
    declarations: [CountryAutocompleteComponent],
    exports: [CountryAutocompleteComponent],
})
export class SftCountryAutocompleteModule {
    static forRoot(dependency: { sflCountriesListLink }): ModuleWithProviders<SftCountryAutocompleteModule> {
        return {
            ngModule: SftCountryAutocompleteModule,
            providers: [
                {provide: SFL_COUNTRIES_LIST_LINK, useValue: dependency.sflCountriesListLink},
            ]
        }
    }
}
