import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FullCountriesListService } from 'sfl-shared/services';
import { SflCountrySelectComponent } from './country-select.component';
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
    providers: [FullCountriesListService],
    declarations: [SflCountrySelectComponent],
    exports: [SflCountrySelectComponent],
})
export class SflCountrySelectModule {
    static forRoot(dependency: { sflCountriesListLink }): ModuleWithProviders {
        return {
            ngModule: SflCountrySelectModule,
            providers: [
                {provide: SFL_COUNTRIES_LIST_LINK, useValue: dependency.sflCountriesListLink},
            ]
        }
    }
}