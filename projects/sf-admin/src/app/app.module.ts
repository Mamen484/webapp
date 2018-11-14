import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SflErrorPagesModule } from 'sfl-shared/error-pages';
import { SflSharedModule } from 'sfl-shared/core';
import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule, MatProgressBarModule,
    MatSelectModule,
    MatTooltipModule
} from '@angular/material';
import { SflMenuModule } from 'sfl-shared/menu';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { SearchStoreComponent } from './admin-menu/search-store/search-store.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserCreatedDialogComponent } from './create-user/user-created-dialog/user-created-dialog.component';
import { ClipboardModule } from 'ngx-clipboard';


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
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        ClipboardModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoginModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatOptionModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTooltipModule,

        SflSharedModule.forRoot({
            baseHref: '',
            languageOptions: {en: 'English'},
            sflApi: environment.SFA_API,
            sflAppToken: environment.APP_TOKEN,
            sflLegacyLink: environment.SFA_LEGACY_LINK,
        }),
        SflMenuModule,
        SflSidebarModule,

        // keep this module in the bottom as it contains a wildcard route
        SflErrorPagesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
