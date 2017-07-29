import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponent } from './base.component';
import { AggregatedUserInfoResolveGuard } from '../core/guards/aggregated-user-info-resolve.guard';
import { MenuModule } from '../menu/menu.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MenuModule,
        SidebarModule
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
