import { ModuleWithProviders, NgModule } from '@angular/core';
import { TrackingToolsComponent } from './tracking-tools.component';
import { EnableGoogleAnalyticsDirective } from './enable-google-analytics.directive';
import { CommonModule } from '@angular/common';
import {
    DEFAULT_AUTOPILOT_EMAIL,
    DEFAULT_AUTOPILOT_STORENAME,
    FULLSTORY_ORG_ID,
    GA_MEASUREMENT_ID,
    GTM_ID,
    ZENDESK_ACCOUNT_LINK
} from './variables';
import { EnableZendeskChatDirective } from './enable-zendesk-chat.directive';
import { ngxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';
import { ZendeskConfig } from './zendesk.config';
import { EnableAutopilotDirective } from './enable-autopilot.directive';
import { EnableAppcuesDirective } from './enable-appcues.directive';
import { EnableFullstoryDirective } from './enable-fullstory.directive';
import { EnableSalesMachineDirective } from './enable-sales-machine.directive';
import { EnableFacebookDirective } from './enable-facebook.directive';
import { EnableGoogleTagsManagementDirective } from './enable-google-tags-manager.directive';

@NgModule({
    declarations: [
        TrackingToolsComponent,
        EnableGoogleAnalyticsDirective,
        EnableGoogleTagsManagementDirective,
        EnableZendeskChatDirective,
        EnableAutopilotDirective,
        EnableAppcuesDirective,
        EnableFullstoryDirective,
        EnableSalesMachineDirective,
        EnableFacebookDirective,
    ],
    imports: [
        CommonModule,
        ngxZendeskWebwidgetModule.forRoot(ZendeskConfig),
    ],
    exports: [TrackingToolsComponent],

})
export class TrackingToolsModule {
    static forRoot(dependency: {
        GTM_ID?,
        GA_MEASUREMENT_ID?,
        ZENDESK_ACCOUNT_LINK?,
        DEFAULT_AUTOPILOT_EMAIL?,
        DEFAULT_AUTOPILOT_STORENAME?,
        FULLSTORY_ORG_ID?
    }): ModuleWithProviders<TrackingToolsModule> {
        return {
            ngModule: TrackingToolsModule,
            providers: [
                {provide: GTM_ID, useValue: dependency.GTM_ID},
                {provide: GA_MEASUREMENT_ID, useValue: dependency.GA_MEASUREMENT_ID},
                {provide: ZENDESK_ACCOUNT_LINK, useValue: dependency.ZENDESK_ACCOUNT_LINK},
                {provide: DEFAULT_AUTOPILOT_EMAIL, useValue: dependency.DEFAULT_AUTOPILOT_EMAIL},
                {provide: DEFAULT_AUTOPILOT_STORENAME, useValue: dependency.DEFAULT_AUTOPILOT_STORENAME},
                {provide: FULLSTORY_ORG_ID, useValue: dependency.FULLSTORY_ORG_ID},
            ]
        }
    }
}
