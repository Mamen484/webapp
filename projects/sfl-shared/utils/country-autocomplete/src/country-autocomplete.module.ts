import { NgModule } from '@angular/core';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
}
