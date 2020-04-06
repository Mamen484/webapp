import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { environment } from '../../../projects/channel-settings/src/environments/environment';
import { HighlightPipe } from './highlight.pipe';
import { CreateAccountComponent } from './create-account/create-account.component';
import {SftSoloSearchModule} from 'sfl-tools/solo-search';
import {SftCountryAutocompleteModule} from 'sfl-tools/country-autocomplete';
import { TimeagoModule } from 'ngx-timeago';
import {SflImageModule} from 'sfl-shared/image';

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
        SftCountryAutocompleteModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflSharedModule,
        SftSoloSearchModule,
        TimeagoModule,
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
        SftCountryAutocompleteModule,
        SflSharedModule,
        SftSoloSearchModule,
        TimeagoModule,

        // pipes
        ArrayFromNumberPipe,
        ChannelLinkPipe,
        HighlightPipe,
        LargeNumberSuffixPipe,
        RemoveUnderlinePipe,
        SfCurrencyPipe,
        SfNumberPipe,
        InvoicesLinkPipe,
        OrdersExportLinkPipe,

        // directives
        HasServerErrorDirective,
        MinNumberDirective,

        // components
        CreateAccountComponent,
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
        CreateAccountComponent,
        HighlightPipe,
    ],
    entryComponents: [ValidationErrorsSnackbarComponent]
})
export class SharedModule {
}
