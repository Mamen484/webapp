import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SftSidebarModule } from 'sfl-tools/src/lib/sidebar';
import { TrackingToolsModule } from 'tracking-tools';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SftSidebarModule,
        RouterModule,
        TrackingToolsModule,
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
