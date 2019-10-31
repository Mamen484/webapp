import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
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
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from 'ngx-clipboard';

import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';
import { SfCurrencyPipe } from './sf-currency.pipe';
import { SfNumberPipe } from './sf-number.pipe';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './blank.component';

import { ScheduleCallIframeComponent } from './schedule-call-iframe.component';
import { RemoveUnderlinePipe } from './remove-underline.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { ValidationErrorsSnackbarComponent } from './validation-errors-snackbar/validation-errors-snackbar.component';
import { InvoicesLinkPipe } from './invoices-link/invoices-link.pipe';
import { OrdersExportLinkPipe } from './orders-export-link/orders-export-link.pipe';
import { ArrayFromNumberPipe } from './array-from-number/array-from-number.pipe';
import { MinNumberDirective } from './min-number/min-number.directive';
import { HasServerErrorDirective } from './validators/has-server-error.directive';
import { SflSharedModule } from 'sfl-shared';
import { ChannelLinkPipe } from './channel-link/channel-link.pipe';
import { SflSoloSearchModule } from 'sfl-shared/utils/solo-search';
import { SflImageModule } from 'sfl-shared/utils/image';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SflCountryAutocompleteModule } from 'sfl-shared/utils/country-autocomplete';
import { environment } from '../../../projects/channel-settings/src/environments/environment';

@NgModule({
    imports: [
        ClipboardModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        SflImageModule,
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
        SflCountryAutocompleteModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflSharedModule,
        SflSoloSearchModule,
    ],
    exports: [
        // modules
        ClipboardModule,
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        SflImageModule,
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
        SflCountryAutocompleteModule,
        SflSharedModule,
        SflSoloSearchModule,

        // pipes
        ArrayFromNumberPipe,
        ChannelLinkPipe,
        LargeNumberSuffixPipe,
        RemoveUnderlinePipe,
        SfCurrencyPipe,
        SfNumberPipe,
        InvoicesLinkPipe,
        OrdersExportLinkPipe,
        TimeAgoPipe,

        // directives
        HasServerErrorDirective,
        MinNumberDirective,

        // components
        ScheduleCallIframeComponent,
        ValidationErrorsSnackbarComponent,
    ],
    declarations: [
        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,
        BlankComponent,
        ScheduleCallIframeComponent,
        RemoveUnderlinePipe,
        ValidationErrorsSnackbarComponent,
        InvoicesLinkPipe,
        OrdersExportLinkPipe,
        ArrayFromNumberPipe,
        MinNumberDirective,
        HasServerErrorDirective,
        ChannelLinkPipe,
        TimeAgoPipe,
    ],
    entryComponents: [ValidationErrorsSnackbarComponent]
})
export class SharedModule {
}
