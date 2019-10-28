import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChannelSettingsComponent } from './channel-settings/channel-settings.component';
import { AppRoutingModule } from './app-routing.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SflCountryAutocompleteModule } from 'sfl-shared/utils/country-autocomplete';
import { SflSharedModule } from 'sfl-shared/core';
import { LoginModule } from './login/login.module';
import { SflImageModule } from 'sfl-shared/utils/image';
import { SettingsSavedSnackbarComponent } from './channel-settings/settings-saved-snackbar/settings-saved-snackbar.component';
import { DeleteRowDialogComponent } from './channel-settings/delete-row-dialog/delete-row-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RowValidationDialogComponent } from './channel-settings/row-validation-dialog/row-validation-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        SflCountryAutocompleteModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflSidebarModule,
        SflSharedModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.apiLink,
            sflAppToken: environment.appToken,
            sflLegacyLink: environment.legacyLink,
        }),
        SflImageModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [SettingsSavedSnackbarComponent, DeleteRowDialogComponent, RowValidationDialogComponent],
})
export class AppModule {
}
