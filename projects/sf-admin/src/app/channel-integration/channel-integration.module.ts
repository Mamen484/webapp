import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChannelIntegrationRoutingModule} from './channel-integration-routing.module';
import {ChannelListComponent} from './channel-list/channel-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SfaSharedModule} from '../shared/shared.module';
import {AdminSidebarModule} from '../admin-sidebar/admin-sidebar.module';
import {CreateAccountComponent} from './create-account/create-account.component';
import {AccountListPipe} from './channel-list/account-list.pipe';
import {CredentialsDialogComponent} from './create-account/credentials-dialog/credentials-dialog.component';
import {environment} from '../../environments/environment';
import {FiltersDialogComponent} from './channel-list/filters-dialog/filters-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {SftCountryAutocompleteModule} from 'sfl-tools/src/lib/country-autocomplete';
import {SftUnsavedDataModule} from 'sfl-tools/src/lib/unsaved-data-guard';


@NgModule({
    declarations: [ChannelListComponent, CreateAccountComponent, AccountListPipe, CredentialsDialogComponent, FiltersDialogComponent],
    imports: [
        CommonModule,
        ChannelIntegrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SfaSharedModule,
        AdminSidebarModule,
        SftCountryAutocompleteModule.forRoot({
            sflCountriesListLink: environment.countriesListLink,
        }),
        SftUnsavedDataModule,
        MatChipsModule,
    ],
    entryComponents: [CredentialsDialogComponent, FiltersDialogComponent],
})
export class ChannelIntegrationModule {
}
