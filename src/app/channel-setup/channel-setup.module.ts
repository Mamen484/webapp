import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSetupRoutingModule } from './channel-setup-routing.module';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { UnsavedDataDialogComponent } from './categories-configuration/unsaved-data-dialog/unsaved-data-dialog.component';

@NgModule({
    declarations: [
        CategoriesConfigurationComponent,
        FilterDialogComponent,
        UnsavedDataDialogComponent,
    ],
    imports: [
        ChannelSetupRoutingModule,
        CommonModule,
        SharedModule,

    ],
    entryComponents: [
        FilterDialogComponent,
        UnsavedDataDialogComponent,
    ],
})
export class ChannelSetupModule {
}
