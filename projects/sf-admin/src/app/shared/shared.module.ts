import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
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
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchStoreDirective } from './search-store/search-store.directive';
import { ErrorMessageComponent } from './error-message/error-message.component';

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
        MatTooltipModule,
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
        MatTableModule,
        MatTooltipModule,

        ErrorMessageComponent,

        SearchStoreDirective,
    ],
    declarations: [
        ErrorMessageComponent,
        SearchStoreDirective,
    ]
})
export class SfaSharedModule {
}
