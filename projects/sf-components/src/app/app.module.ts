import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { currentRouteReducer, currentStoreReducer, userInfoReducer } from 'sfl-shared/reducers';
import { SflSharedModule } from 'sfl-shared';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { InitializeComponent } from './initialize.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SflWebappLinkService } from 'sfl-shared/services';
import { WebappLinkService } from './webapp-link.service';
import { SftSidebarWebModule } from 'sfl-tools/src/lib/sidebar';
import { MenuTabsComponent, MenuTabsModule } from 'sfl-tools/src/lib/menu-tabs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppModule as SfuiWebAppModule } from '../../../sfui-web-components/src/app/app.module';
import { CurrentRouteComponent } from './current-route/current-route.component';
import { TrackingToolsComponent, TrackingToolsModule } from 'tracking-tools';

@NgModule({
    declarations: [
        SidebarComponent,
        InitializeComponent,
        CurrentRouteComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SflSharedModule.forRoot({
            sflApi: environment.apiLink,
            baseHref: '',
            languageOptions: {},
            sflDefaultLanguage: 'en',
            sflAppToken: 'any',
            sflLegacyLink: '',
        }),
        SftSidebarWebModule,
        MenuTabsModule,
        HttpClientModule,
        StoreModule.forRoot({
            userInfo: userInfoReducer,
            currentStore: currentStoreReducer,
            currentRoute: currentRouteReducer,
        }),
        MatProgressBarModule,
        TrackingToolsModule.forRoot({
            GA_MEASUREMENT_ID: environment.googleAnalyticsMeasurmentId,
            ZENDESK_ACCOUNT_LINK: environment.zendeskAccountLink,
            DEFAULT_AUTOPILOT_EMAIL: 'default@shopping-feed.com',
            DEFAULT_AUTOPILOT_STORENAME: 'default',
            FULLSTORY_ORG_ID: 'D6X8Q',
        }),
    ],
    providers: [
        {provide: Router, useValue: {isActive: () => false, navigate: (...args) => false}},
        {provide: SflWebappLinkService, useClass: WebappLinkService},
    ],
})
export class AppModule extends SfuiWebAppModule implements DoBootstrap {

    constructor(protected injector: Injector) {
        super(injector);
        this.registerElement(SidebarComponent, 'sfc-sidebar');
        this.registerElement(MenuTabsComponent, 'sfc-menu-tabs');
        this.registerElement(InitializeComponent, 'sfc-initialize');
        this.registerElement(CurrentRouteComponent, 'sfc-current-route');
        this.registerElement(TrackingToolsComponent, 'sfc-tracking-tools');
    }

    ngDoBootstrap() {
    }
}
