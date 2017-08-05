import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from '../shared/shared.module';
import { ConfiguredChannelComponent } from './configured-channel/configured-channel.component';
import { StoreStatisticsComponent } from './store-statistics/store-statistics.component';
import { SuggestedChannelComponent } from './suggested-channel/suggested-channel.component';

@NgModule({
  imports: [
    CommonModule,
      SharedModule,
  ],
    exports: [StatisticsComponent],
  declarations: [StatisticsComponent, ConfiguredChannelComponent, StoreStatisticsComponent, SuggestedChannelComponent]
})
export class StatisticsModule { }
