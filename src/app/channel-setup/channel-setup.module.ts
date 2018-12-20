import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelSetupRoutingModule } from './channel-setup-routing.module';
import { AmazonAccountDialogComponent } from './amazon-account-dialog/amazon-account-dialog.component';
import { CategoriesConfigurationComponent } from './categories-configuration/categories-configuration.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AmazonAccountDialogComponent, CategoriesConfigurationComponent],
    imports: [
        CommonModule,
        SharedModule,
        ChannelSetupRoutingModule,
    ],
    entryComponents: [
        AmazonAccountDialogComponent,
    ],
})
export class ChannelSetupModule {
}
