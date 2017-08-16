import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdAutocompleteModule, MdButtonModule, MdCardModule, MdDialogModule,
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule, MdSelectModule, MdSidenavModule,
    MdToolbarModule, MdTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';
import { SfCurrencyPipe } from './sf-currency.pipe';
import { SfNumberPipe } from './sf-number.pipe';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdSelectModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdToolbarModule,
        MdTooltipModule,
        ReactiveFormsModule,
    ],
    exports: [
        // modules
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        MdAutocompleteModule,
        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdSelectModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdToolbarModule,
        MdTooltipModule,
        ReactiveFormsModule,

        // pipes
        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,
    ],
    declarations: [LargeNumberSuffixPipe, SfCurrencyPipe, SfNumberPipe]
})
export class SharedModule {
}
