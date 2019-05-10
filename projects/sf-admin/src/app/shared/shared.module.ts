import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchStoreDirective } from './search-store/search-store.directive';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SubnavComponent } from './subnav/subnav.component';
import { SflSoloSearchModule } from 'sfl-shared/utils/solo-search';

@NgModule({
    imports: [
        CommonModule,
        ClipboardModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatOptionModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,
        SflSoloSearchModule,
    ],
    exports: [
        ClipboardModule,
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatOptionModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        SflSoloSearchModule,

        ErrorMessageComponent,
        SubnavComponent,

        SearchStoreDirective,
    ],
    declarations: [
        ErrorMessageComponent,
        SearchStoreDirective,
        SubnavComponent,
    ]
})
export class SfaSharedModule {
}
