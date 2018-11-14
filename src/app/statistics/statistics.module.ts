import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';
import { StoreStatisticsComponent } from './store-statistics/store-statistics.component';
import { SearchChannelsComponent } from './search-channels/search-channels.component';
import { FilterChannelsDialogComponent } from './filter-channels-dialog/filter-channels-dialog.component';
import { ConnectIntlChannelDialogComponent } from './connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { IntlRequestSuccessDialogComponent } from './intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from './request-failed-dialog/request-failed-dialog.component';
import { AcceptChannelDialogComponent } from './accept-channel-dialog/accept-channel-dialog.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { LastEventsComponent } from './last-events/last-events.component';
import { EventStatsRowComponent } from './event-stats-row/event-stats-row.component';
import { OrderErrorRowComponent } from './order-error-row/order-error-row.component';
import { ChannelBoxModule } from './channel-box/channel-box.module';
import { SflSharedModule } from 'sfl-shared';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StatisticsRoutingModule,
        ChannelBoxModule,
        SflSharedModule,
    ],
    exports: [StatisticsComponent],
    declarations: [StatisticsComponent,
        StoreStatisticsComponent,
        SearchChannelsComponent,
        FilterChannelsDialogComponent,
        ConnectIntlChannelDialogComponent,
        IntlRequestSuccessDialogComponent,
        RequestFailedDialogComponent,
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
        AcceptChannelDialogComponent,
    ]
})
export class StatisticsModule {
}
