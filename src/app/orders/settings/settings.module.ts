import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsNavComponent } from './settings-nav/settings-nav.component';
import { CreateTestOrderComponent } from './create-test-order/create-test-order.component';
import { SidebarModule } from '../../sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        SharedModule,
        SettingsRoutingModule,
    ],
    declarations: [
        TagsManagementComponent,
        SettingsNavComponent,
        CreateTestOrderComponent,
    ]
})
export class SettingsModule {
}
