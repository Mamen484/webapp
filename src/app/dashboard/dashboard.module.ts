import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StoreActivityComponent } from './store-activity/store-activity.component';
import { SharedModule } from '../shared/shared.module';
import { SfuiIconModule } from 'sfui';
import { ChannelsModule } from '../channels/channels.module';
import { LastEventsComponent } from './last-events/last-events.component';


@NgModule({
    declarations: [DashboardComponent, StoreActivityComponent, LastEventsComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        SfuiIconModule,
        ChannelsModule,
    ]
})
export class DashboardModule {
}
