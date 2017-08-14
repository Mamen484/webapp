import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';
import { ConfiguredChannelComponent } from './configured-channel/configured-channel.component';
import { StoreStatisticsComponent } from './store-statistics/store-statistics.component';
import { SuggestedChannelComponent } from './suggested-channel/suggested-channel.component';
import { SearchChannelsComponent } from './search-channels/search-channels.component';

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
        SearchChannelsComponent
    ]
})
export class StatisticsModule {
}
