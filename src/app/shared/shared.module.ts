import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdChipsModule, MdDatepicker, MdDatepickerModule, MdDialogModule,
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule,
    MdSelectModule, MdSidenavModule,
    MdToolbarModule, MdTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';
import { SfCurrencyPipe } from './sf-currency.pipe';
import { SfNumberPipe } from './sf-number.pipe';
import { RouterModule } from '@angular/router';
import { LegacyLinkDirective } from './legacy-link.directive';
import { BlankComponent } from './blank.component';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdCardModule,
        MdChipsModule,
        MdDatepickerModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdSelectModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdToolbarModule,
        MdTooltipModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        // modules
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdCardModule,
        MdChipsModule,
        MdDatepickerModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdSelectModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdToolbarModule,
        MdTooltipModule,
        ReactiveFormsModule,
        RouterModule,

        // pipes
        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,

        // directives
        LegacyLinkDirective,

    ],
    declarations: [LargeNumberSuffixPipe, SfCurrencyPipe, SfNumberPipe, LegacyLinkDirective, BlankComponent]
})
export class SharedModule {
}
