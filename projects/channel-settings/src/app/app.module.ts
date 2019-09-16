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
    MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SflCountryAutocompleteModule } from 'sfl-shared/utils/country-autocomplete';
import { SflSharedModule } from 'sfl-shared/core';
import { LoginModule } from './login/login.module';
import { SflImageModule } from 'sfl-shared/utils/image';

@NgModule({
    declarations: [
        AppComponent,
        ChannelSettingsComponent,
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
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
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
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflImageModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
