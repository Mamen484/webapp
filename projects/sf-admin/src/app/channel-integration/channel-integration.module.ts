import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelIntegrationRoutingModule } from './channel-integration-routing.module';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SfaSharedModule } from '../shared/shared.module';
import { AdminSidebarModule } from '../admin-sidebar/admin-sidebar.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SearchCountryDirective } from './create-account/search-country/search-country.directive';
import { AccountListPipe } from './channel-list/account-list.pipe';


@NgModule({
    declarations: [ChannelListComponent, CreateAccountComponent, SearchCountryDirective, AccountListPipe],
    imports: [
        CommonModule,
        ChannelIntegrationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SfaSharedModule,
        AdminSidebarModule,
    ]
})
export class ChannelIntegrationModule {
}
