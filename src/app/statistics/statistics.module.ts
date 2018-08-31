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
import { AcceptChannelDialogComponent } from './accept-channel-dialog/accept-channel-dialog.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { LastEventsComponent } from './last-events/last-events.component';
import { EventStatsRowComponent } from './event-stats-row/event-stats-row.component';
import { OrderErrorRowComponent } from './order-error-row/order-error-row.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StatisticsRoutingModule,
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
        AcceptChannelDialogComponent,
        LastEventsComponent,
        EventStatsRowComponent,
        OrderErrorRowComponent,
    ],
    entryComponents: [
        FilterChannelsDialogComponent,
        ConnectIntlChannelDialogComponent,
        IntlRequestSuccessDialogComponent,
        RequestFailedDialogComponent,
        NoChannelsDialogComponent,
        ScheduleCallDialogComponent,
        AcceptChannelDialogComponent,
    ]
})
export class StatisticsModule {
}
