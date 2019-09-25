import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConfiguredChannelComponent } from './configured-channel/configured-channel.component';
import { SuggestedChannelComponent } from './suggested-channel/suggested-channel.component';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        ConfiguredChannelComponent,
        SuggestedChannelComponent,
        TimeAgoPipe,
    ],
    exports: [
        ConfiguredChannelComponent,
        SuggestedChannelComponent,
    ],
})
export class ChannelBoxModule {
}
