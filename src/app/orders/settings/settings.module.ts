import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { SharedModule } from '../shared/shared.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';

@NgModule({
    imports: [
        CommonModule,
        SflSidebarModule,
        SharedModule,
        SettingsRoutingModule,
    ],
    declarations: [
        TagsManagementComponent,
    ]
})
export class SettingsModule {
}
