import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguredChannelStubComponent } from './configured-channel-stub.component';
import { FilterChannelsDialogStubComponent } from './filter-channels-dialog-stub.component';
import { SearchChannelsStubComponent } from './search-channels-stub.component';
import { StoreStatisticsStubComponent } from './store-statistics-stub.component';
import { SuggestedChannelStubComponent } from './suggested-channel-stub.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      ConfiguredChannelStubComponent,
      SuggestedChannelStubComponent,
      FilterChannelsDialogStubComponent,
      SearchChannelsStubComponent,
      StoreStatisticsStubComponent
  ]
})
export class StubsModule { }
