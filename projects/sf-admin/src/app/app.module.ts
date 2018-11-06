import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SflErrorPagesModule } from 'sfl-shared/src/lib/error-pages';
import { SflCoreModule } from '../../../sfl-shared/src/lib/core/core.module';
import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        LoginModule,
        SflCoreModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.SFA_API,
            sflAppToken: environment.APP_TOKEN
        }),

        // keep this module in the bottom as it contains a wildcard route
        SflErrorPagesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
