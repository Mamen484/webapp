import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';
import { SflSharedModule } from 'sfl-shared/core';
import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SflMenuModule } from 'sfl-shared/menu';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { SearchStoreComponent } from './admin-menu/search-store/search-store.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserCreatedDialogComponent } from './create-user/user-created-dialog/user-created-dialog.component';
import { BillingAuthInterceptor } from './billing/billing-auth-interceptor.service';
import { SfaSharedModule } from './shared/shared.module';


@NgModule({
    declarations: [
        AppComponent,
        AdminBaseComponent,
        AdminMenuComponent,
        AdminSidebarComponent,
        CreateUserComponent,
        SearchStoreComponent,
        UserCreatedDialogComponent,
    ],
    entryComponents: [UserCreatedDialogComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoginModule,
        SflSharedModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.SFA_API,
            sflAppToken: environment.APP_TOKEN,
            sflLegacyLink: environment.SFA_LEGACY_LINK,
        }),
        SflMenuModule,
        SflSidebarModule,
        SfaSharedModule,

        // keep this module in the bottom as it contains a wildcard route
        SflErrorPagesModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: BillingAuthInterceptor, multi: true},
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
