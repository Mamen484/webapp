import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';
import { ConfiguredChannelComponent } from './configured-channel/configured-channel.component';
import { StoreStatisticsComponent } from './store-statistics/store-statistics.component';
import { SuggestedChannelComponent } from './suggested-channel/suggested-channel.component';
import { SearchChannelsComponent } from './search-channels/search-channels.component';
import { FilterChannelsDialogComponent } from './filter-channels-dialog/filter-channels-dialog.component';
import { ConnectIntlChannelDialogComponent } from './connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { IntlRequestSuccessDialogComponent } from './intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from './request-failed-dialog/request-failed-dialog.component';
import { NoChannelsDialogComponent } from './no-channels-dialog/no-channels-dialog.component';
import { ScheduleCallDialogComponent } from './schedule-call-dialog/schedule-call-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [StatisticsComponent],
    declarations: [StatisticsComponent,
        ConfiguredChannelComponent,
        StoreStatisticsComponent,
        SuggestedChannelComponent,
        SearchChannelsComponent,
        FilterChannelsDialogComponent,
        ConnectIntlChannelDialogComponent,
        IntlRequestSuccessDialogComponent,
        RequestFailedDialogComponent,
        ScheduleCallDialogComponent,
        NoChannelsDialogComponent,
    ],
    entryComponents: [
        FilterChannelsDialogComponent,
        ConnectIntlChannelDialogComponent,
        IntlRequestSuccessDialogComponent,
        RequestFailedDialogComponent,
        NoChannelsDialogComponent,
        ScheduleCallDialogComponent,
    ]
})
export class StatisticsModule {
}
