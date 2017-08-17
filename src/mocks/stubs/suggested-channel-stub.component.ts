import { Component, Input } from '@angular/core';
import { Channel } from '../../app/core/entities/channel';

@Component({
    selector: 'sf-suggested-channel',
    template: ''
})
export class SuggestedChannelStubComponent {
    @Input() channel: Channel;
}
