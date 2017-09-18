import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SidebarModule,
        RouterModule,
        MenuModule,
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
