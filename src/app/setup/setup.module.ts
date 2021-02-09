import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SetupRoutingModule} from './setup-routing.module';
import {FeedSetupComponent} from './feed-setup/feed-setup.component';
import {SharedModule} from '../shared/shared.module';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {FeedCategoriesListComponent} from './feed-setup/feed-categories-list/feed-categories-list.component';
import {AutotagMappingComponent} from './shared/autotag-mapping/autotag-mapping.component';
import {CategoryMappingComponent} from './shared/category-mapping/category-mapping.component';
import {AutotagInputComponent} from './shared/autotag-mapping/autotag-input/autotag-input.component';
import {AutotagDropdownComponent} from './shared/autotag-mapping/autotag-dropdown/autotag-dropdown.component';
import {SettingsSavedSnackbarComponent} from './shared/settings-saved-snackbar/settings-saved-snackbar.component';
import {AutotagsRequiredSnackbarComponent} from './shared/autotag-mapping/autotags-required-snackbar/autotags-required-snackbar.component';
import {SftUnsavedDataModule} from 'sfl-tools/src/lib/unsaved-data-guard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AttributesListComponent } from './shared/autotag-mapping/attributes-list/attributes-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AttributesUpdateErrorSnackbarComponent } from './shared/autotag-mapping/attributes-update-error-snackbar/attributes-update-error-snackbar.component';
import { ProductSetupComponent } from './product-setup/product-setup.component';
import { ConfigurationStatusComponent } from './shared/configuration-status/configuration-status.component';
import { ProductsListComponent } from './product-setup/products-list/products-list.component';
import { CategoryMappingService } from './shared/category-mapping.service';
import { FeedCategoryMappingService } from './feed-setup/feed-category-mapping.service';

@NgModule({
    declarations: [
        FeedSetupComponent,
        FilterDialogComponent,
        FeedCategoriesListComponent,
        AutotagMappingComponent,
        CategoryMappingComponent,
        AutotagInputComponent,
        AutotagDropdownComponent,
        SettingsSavedSnackbarComponent,
        AutotagsRequiredSnackbarComponent,
        AttributesListComponent,
        AttributesUpdateErrorSnackbarComponent,
        ProductSetupComponent,
        ConfigurationStatusComponent,
        ProductsListComponent,
    ],
    imports: [
        SetupRoutingModule,
        CommonModule,
        SharedModule,
        SftUnsavedDataModule,
        ScrollingModule,
        MatExpansionModule,
    ],
    entryComponents: [
        FilterDialogComponent,
        SettingsSavedSnackbarComponent,
        AutotagsRequiredSnackbarComponent,
    ],
})
export class SetupModule {
}
