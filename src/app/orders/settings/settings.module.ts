import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { SharedModule } from '../shared/shared.module';
import { SettingsNavComponent } from './settings-nav/settings-nav.component';
import { SettingsBaseComponent } from './settings-base/settings-base.component';
import { CreateTestOrderComponent } from './create-test-order/create-test-order.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SettingsRoutingModule,
    ],
    declarations: [
        TagsManagementComponent,
        SettingsNavComponent,
        SettingsBaseComponent,
        CreateTestOrderComponent,
    ]
})
export class SettingsModule {
}
