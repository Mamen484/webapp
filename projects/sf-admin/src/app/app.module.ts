import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';
import { SflSharedModule } from 'sfl-shared';
import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SflMenuModule } from 'sfl-shared/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserCreatedDialogComponent } from './create-user/user-created-dialog/user-created-dialog.component';
import { BillingAuthInterceptor } from './billing/billing-auth-interceptor.service';
import { SfaSharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminSidebarModule } from './admin-sidebar/admin-sidebar.module';
import {SftCountrySelectModule} from 'sfl-tools/src/lib/country-select';
import { StoreModule } from '@ngrx/store';
import { currentRouteReducer, currentStoreReducer, userInfoReducer } from 'sfl-shared/reducers';

@NgModule({
    declarations: [
        AppComponent,
        CreateUserComponent,
        UserCreatedDialogComponent,
    ],
    entryComponents: [UserCreatedDialogComponent],
    imports: [
        AppRoutingModule,
        AdminSidebarModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoginModule,
        MatSidenavModule,
        SftCountrySelectModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SflSharedModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.SFA_API,
            sflAppToken: environment.APP_TOKEN,
            sflLegacyLink: environment.SFA_LEGACY_LINK,
        }),
        SflMenuModule,
        SfaSharedModule,

        // keep this module in the bottom as it contains a wildcard route
        SflErrorPagesModule,
        StoreModule.forRoot({
            currentStore: currentStoreReducer,
        }),
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BillingAuthInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
