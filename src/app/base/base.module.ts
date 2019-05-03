import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ngxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';

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
    ],
    providers: [
        AggregatedUserInfoResolveGuard
    ]
})
export class BaseModule {
}
