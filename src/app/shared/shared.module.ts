import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSidenavModule, MatSnackBarModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from 'ngx-clipboard';

import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';
import { SfCurrencyPipe } from './sf-currency.pipe';
import { SfNumberPipe } from './sf-number.pipe';
import { RouterModule } from '@angular/router';
import { LegacyLinkDirective } from './legacy-link.directive';
import { BlankComponent } from './blank.component';
import { CountrySelectComponent } from './country-select/country-select.component';

import { ScheduleCallIframeComponent } from './schedule-call-iframe.component';
import { LayoutModule } from '@angular/cdk/layout';
@NgModule({
    imports: [
        ClipboardModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        LayoutModule,
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
        MatSnackBarModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        // modules
        ClipboardModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        InfiniteScrollModule,
        LayoutModule,
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
        MatSnackBarModule,
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

        // components
        CountrySelectComponent,
        ScheduleCallIframeComponent,

    ],
    declarations: [
        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,
        LegacyLinkDirective,
        BlankComponent,
        CountrySelectComponent,
        ScheduleCallIframeComponent,
    ]
})
export class SharedModule {
}
