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
import { ChannelLanguage } from './core/entities/channel-language.enum';
import { environment } from '../environments/environment';
import { SflAuthModule } from 'sfl-shared/auth';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { TicketsModule } from './tickets/tickets.module';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { SfTimeagoIntlService } from './core/services/sf-timeago-intl.service';
import { SflSharedModule } from 'sfl-shared';
import { SflWebappLinkService } from 'sfl-shared/services';
import { WebappLinkService } from './core/services/webapp-link.service';
import { TrackingToolsModule } from 'tracking-tools';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SflAuthModule,
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
        TicketsModule,
        TimeagoModule.forRoot({
            intl: {provide: TimeagoIntl, useClass: SfTimeagoIntlService},
            formatter: {provide: TimeagoFormatter, useClass: TimeagoCustomFormatter}
        }),
        // keep this module in the bottom as it contains a wildcard route
        ErrorPagesModule,
        TrackingToolsModule.forRoot({
            GTM_ID: environment.GTM_ID,
        }),
    ],
    bootstrap: [AppComponent],
    providers: [{provide: SflWebappLinkService, useClass: WebappLinkService}],
})
export class AppModule {
}
