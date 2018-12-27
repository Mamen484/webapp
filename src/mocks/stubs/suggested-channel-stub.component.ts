import { Component, Input } from '@angular/core';
import { Channel } from 'sfl-shared/entities';


@Component({
    selector: 'sf-suggested-channel',
    template: ' '
})
export class SuggestedChannelStubComponent {
    @Input() channel: Channel;
    @Input() internationalMode = false;
    @Input() firstChannel: boolean;
    @Input() charge;
}
