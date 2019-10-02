import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ngxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';
import { AppcuesComponent } from './appcues/appcues.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SidebarModule,
        RouterModule,
        ngxZendeskWebwidgetModule,
    ],
    declarations: [
        BaseComponent,
        AppcuesComponent,
    ],
    providers: [
        AggregatedUserInfoResolveGuard
    ]
})
export class BaseModule {
}
