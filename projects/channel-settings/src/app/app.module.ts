import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChannelSettingsComponent} from './channel-settings/channel-settings.component';
import {AppRoutingModule} from './app-routing.module';
import {SflSidebarModule} from 'sfl-shared/sidebar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {SflSharedModule} from 'sfl-shared/core';
import {LoginModule} from './login/login.module';
import {SettingsSavedSnackbarComponent} from './channel-settings/settings-saved-snackbar/settings-saved-snackbar.component';
import {DeleteRowDialogComponent} from './channel-settings/delete-row-dialog/delete-row-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RowValidationDialogComponent} from './channel-settings/row-validation-dialog/row-validation-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SflErrorPagesModule} from 'sfl-shared/error-pages';
import {SftCountryAutocompleteModule} from 'sfl-tools/src/lib/country-autocomplete';

@NgModule({
    declarations: [
        AppComponent,
        ChannelSettingsComponent,
        SettingsSavedSnackbarComponent,
        DeleteRowDialogComponent,
        RowValidationDialogComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        LoginModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        SftCountryAutocompleteModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflErrorPagesModule,
        SflSidebarModule,
        SflSharedModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.apiLink,
            sflAppToken: environment.appToken,
            sflLegacyLink: environment.legacyLink,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [SettingsSavedSnackbarComponent, DeleteRowDialogComponent, RowValidationDialogComponent],
})
export class AppModule {
}
