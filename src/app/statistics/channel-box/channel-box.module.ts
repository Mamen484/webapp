import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        SuggestedChannelComponent,
    ],
    exports: [
        ConfiguredChannelComponent,
        SuggestedChannelComponent,
    ],
})
export class ChannelBoxModule {
}
