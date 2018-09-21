import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule,
    MatTabsModule, MatTableModule, MatCheckboxModule, MatPaginatorModule,
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
import { RemoveUnderlinePipe } from './remove-underline.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { CountryAutocompleteComponent } from './country-autocomplete/country-autocomplete.component';
import { ImageComponent } from './image/image.component';
import { ValidationErrorsSnackbarComponent } from './validation-errors-snackbar/validation-errors-snackbar.component';
import { InvoicesLinkPipe } from './invoices-link/invoices-link.pipe';
import { OrdersExportLinkPipe } from './orders-export-link/orders-export-link.pipe';
import { ArrayFromNumberPipe } from './array-from-number/array-from-number.pipe';
import { MinNumberDirective } from './min-number/min-number.directive';

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
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatTabsModule,
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
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatTableModule,
        MatTabsModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        RouterModule,

        // pipes
        ArrayFromNumberPipe,
        LargeNumberSuffixPipe,
        RemoveUnderlinePipe,
        SfCurrencyPipe,
        SfNumberPipe,
        InvoicesLinkPipe,
        OrdersExportLinkPipe,

        // directives
        LegacyLinkDirective,
        MinNumberDirective,

        // components
        CountrySelectComponent,
        CountryAutocompleteComponent,
        ScheduleCallIframeComponent,
        ImageComponent,
        ValidationErrorsSnackbarComponent

    ],
    declarations: [
        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,
        LegacyLinkDirective,
        BlankComponent,
        CountrySelectComponent,
        ScheduleCallIframeComponent,
        RemoveUnderlinePipe,
        CountryAutocompleteComponent,
        ImageComponent,
        ValidationErrorsSnackbarComponent,
        InvoicesLinkPipe,
        OrdersExportLinkPipe,
        ArrayFromNumberPipe,
        MinNumberDirective,
    ],
    entryComponents: [ValidationErrorsSnackbarComponent]
})
export class SharedModule {
}
