import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { SnackbarsModule } from './snackbars/snackbars.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SflSharedModule } from 'sfl-shared/core';
import { ChannelLanguage } from './core/entities/channel-language.enum';
import { environment } from '../environments/environment';
import { SflAuthModule } from 'sfl-shared/auth';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';
import { ErrorPagesModule } from './error-pages/error-pages.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SflAuthModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CoreModule,
        BaseModule,
        SharedModule,
        SnackbarsModule,
        AppRoutingModule,
        LoginModule,
        SflSharedModule.forRoot({
            baseHref: environment.BASE_HREF,
            languageOptions: ChannelLanguage,
            sflApi: environment.API_URL,
            sflAppToken: environment.APP_AUTHORIZATION,
            sflLegacyLink: environment.APP_URL,
        }),
        // keep this module in the bottom as it contains a wildcard route
        ErrorPagesModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
