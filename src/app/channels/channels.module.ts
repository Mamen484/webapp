import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelsRoutingModule } from './channels-routing.module';
import { ChannelsListComponent } from './channels-list/channels-list.component';
import { ConnectedChannelsComponent } from './channels-list/connected-channels/connected-channels.component';
import { AllChannelsComponent } from './channels-list/all-channels/all-channels.component';
import { SfuiFormFieldModule, SfuiIconModule, SfuiSelectModule } from 'sfui';
import { SharedModule } from '../shared/shared.module';
import { CountryComponent } from './channels-list/all-channels/country/country.component';
import { ConnectButtonComponent } from './channels-list/all-channels/connect-button/connect-button.component';
import { ConnectIntlChannelDialogComponent } from './channels-list/all-channels/connect-button/connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { IntlRequestSuccessDialogComponent } from './channels-list/all-channels/connect-button/intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from './channels-list/all-channels/connect-button/request-failed-dialog/request-failed-dialog.component';
import { NoChannelsFoundMessageComponent } from './channels-list/no-channels-found-message/no-channels-found-message.component';
import { DataTableComponent } from './channels-list/connected-channels/data-table/data-table.component';
import { DataTableComponent as RecommendedDataTableComponent } from './channels-list/all-channels/data-table/data-table.component';
import { NoChannelsMessageComponent } from './channels-list/connected-channels/no-channels-message/no-channels-message.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MenuTabsModule } from 'sfl-tools/src/lib/menu-tabs';


@NgModule({
    declarations: [
        ChannelsListComponent,
        ConnectedChannelsComponent,
        AllChannelsComponent,
        CountryComponent,
        ConnectButtonComponent,
        ConnectIntlChannelDialogComponent,
        IntlRequestSuccessDialogComponent,
        RequestFailedDialogComponent,
        NoChannelsFoundMessageComponent,
        DataTableComponent,
        RecommendedDataTableComponent,
        NoChannelsMessageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ChannelsRoutingModule,
        SfuiFormFieldModule,
        SfuiIconModule,
        SfuiSelectModule,
        NgxSkeletonLoaderModule,
        MenuTabsModule,

    ],
    exports: [
        ConnectedChannelsComponent,
        AllChannelsComponent,
        DataTableComponent,
        RecommendedDataTableComponent,
        NoChannelsMessageComponent,
    ]
})
export class ChannelsModule {
}
