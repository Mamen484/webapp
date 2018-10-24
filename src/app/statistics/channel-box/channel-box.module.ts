import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelTurnoverComponent } from './channel-turnover/channel-turnover.component';
import { ChannelOnlineComponent } from './channel-online/channel-online.component';
import { StatsUnavailableComponent } from './stats-unavailable/stats-unavailable.component';
import { ChannelBoxComponent } from './channel-box.component';
import { SharedModule } from '../../shared/shared.module';
import { ConfiguredChannelComponent } from './configured-channel/configured-channel.component';
import { SuggestedChannelComponent } from './suggested-channel/suggested-channel.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        ConfiguredChannelComponent,
        ChannelBoxComponent,
        ChannelTurnoverComponent,
        ChannelOnlineComponent,
        StatsUnavailableComponent,
        SuggestedChannelComponent
    ],
    exports: [
        ConfiguredChannelComponent,
        SuggestedChannelComponent,
    ],
})
export class ChannelBoxModule {
}
