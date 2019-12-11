import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChannelSetupRoutingModule} from './channel-setup-routing.module';
import {CategoriesConfigurationComponent} from './categories-configuration/categories-configuration.component';
import {SharedModule} from '../shared/shared.module';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {FeedCategoriesListComponent} from './categories-configuration/feed-categories-list/feed-categories-list.component';
import {AutotagMappingComponent} from './categories-configuration/autotag-mapping/autotag-mapping.component';
import {CategoryMappingComponent} from './categories-configuration/category-mapping/category-mapping.component';
import {AutotagInputComponent} from './categories-configuration/autotag-mapping/autotag-input/autotag-input.component';
import {AutotagDropdownComponent} from './categories-configuration/autotag-mapping/autotag-dropdown/autotag-dropdown.component';
import {SettingsSavedSnackbarComponent} from './categories-configuration/settings-saved-snackbar/settings-saved-snackbar.component';
import {AutotagsRequiredSnackbarComponent} from './categories-configuration/autotag-mapping/autotags-required-snackbar/autotags-required-snackbar.component';
import {SftUnsavedDataModule} from 'sfl-tools/src/lib/unsaved-data-guard';

@NgModule({
    declarations: [
        CategoriesConfigurationComponent,
        FilterDialogComponent,
        FeedCategoriesListComponent,
        AutotagMappingComponent,
        CategoryMappingComponent,
        AutotagInputComponent,
        AutotagDropdownComponent,
        SettingsSavedSnackbarComponent,
        AutotagsRequiredSnackbarComponent,
    ],
    imports: [
        ChannelSetupRoutingModule,
        CommonModule,
        SharedModule,
        SftUnsavedDataModule,
    ],
    entryComponents: [
        FilterDialogComponent,
        SettingsSavedSnackbarComponent,
        AutotagsRequiredSnackbarComponent,
    ],
})
export class ChannelSetupModule {
}
