import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSetupRoutingModule } from './channel-setup-routing.module';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { UnsavedDataDialogComponent } from './categories-configuration/unsaved-data-dialog/unsaved-data-dialog.component';
import { FeedCategoriesListComponent } from './categories-configuration/feed-categories-list/feed-categories-list.component';
import { AutotagMappingComponent } from './categories-configuration/autotag-mapping/autotag-mapping.component';
import { CategoryMappingComponent } from './categories-configuration/category-mapping/category-mapping.component';
import { AutotagInputComponent } from './categories-configuration/autotag-mapping/autotag-input/autotag-input.component';
import { AutotagDropdownComponent } from './categories-configuration/autotag-mapping/autotag-dropdown/autotag-dropdown.component';

@NgModule({
    declarations: [
        CategoriesConfigurationComponent,
        FilterDialogComponent,
        UnsavedDataDialogComponent,
        FeedCategoriesListComponent,
        AutotagMappingComponent,
        CategoryMappingComponent,
        AutotagInputComponent,
        AutotagDropdownComponent,
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
