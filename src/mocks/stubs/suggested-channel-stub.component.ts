import { Component, Input } from '@angular/core';
import { Channel } from 'sfl-shared/src/lib/core/entities';


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
