import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSetupRoutingModule } from './channel-setup-routing.module';
import { AmazonAccountDialogComponent } from './amazon-account-dialog/amazon-account-dialog.component';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { WelcomeInstructionsComponent } from './welcome-instructions/welcome-instructions.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@NgModule({
    declarations: [
        AmazonAccountDialogComponent,
        CategoriesConfigurationComponent,
        FilterDialogComponent,
        WelcomeInstructionsComponent,
    ],
    imports: [
        ChannelSetupRoutingModule,
        CommonModule,
        SharedModule,

    ],
    entryComponents: [
        AmazonAccountDialogComponent,
        FilterDialogComponent,
        WelcomeInstructionsComponent,
    ],
})
export class ChannelSetupModule {
}
