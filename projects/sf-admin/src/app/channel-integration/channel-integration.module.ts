import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelIntegrationRoutingModule } from './channel-integration-routing.module';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfaSharedModule } from '../shared/shared.module';
import { AdminSidebarModule } from '../admin-sidebar/admin-sidebar.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListPipe } from './channel-list/account-list.pipe';
import { SflCountryAutocompleteModule } from 'sfl-shared/utils/country-autocomplete';
import { CredentialsDialogComponent } from './create-account/credentials-dialog/credentials-dialog.component';
import { UnsavedDataModule } from 'sfl-shared/utils/unsved-data-guard';


@NgModule({
    declarations: [ChannelListComponent, CreateAccountComponent, AccountListPipe, CredentialsDialogComponent],
    imports: [
        CommonModule,
        ChannelIntegrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SfaSharedModule,
        AdminSidebarModule,
        SflCountryAutocompleteModule,
        UnsavedDataModule,
    ],
    entryComponents: [CredentialsDialogComponent],
})
export class ChannelIntegrationModule {
}
