import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSidenavModule,
    MatToolbarModule, MatTooltipModule
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
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        // modules
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
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
