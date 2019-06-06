import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSetupRoutingModule } from './channel-setup-routing.module';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { UnsavedDataDialogComponent } from './categories-configuration/unsaved-data-dialog/unsaved-data-dialog.component';
import { FeedCategoriesListComponent } from './categories-configuration/feed-categories-list/feed-categories-list.component';
import { AutotagMappingComponent } from './categories-configuration/autotag-mapping/autotag-mapping.component';
import { MatStepperModule } from '@angular/material';
import { CategoryMappingComponent } from './categories-configuration/category-mapping/category-mapping.component';

@NgModule({
    declarations: [
        CategoriesConfigurationComponent,
        FilterDialogComponent,
        UnsavedDataDialogComponent,
        FeedCategoriesListComponent,
        AutotagMappingComponent,
        CategoryMappingComponent,
    ],
    imports: [
        ChannelSetupRoutingModule,
        CommonModule,
        SharedModule,
        MatStepperModule,
    ],
    entryComponents: [
        FilterDialogComponent,
        UnsavedDataDialogComponent,
    ],
})
export class ChannelSetupModule {
}
