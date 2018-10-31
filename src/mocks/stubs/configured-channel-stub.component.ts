import { Component, Input } from '@angular/core';
import { StoreChannel } from 'sfl-shared/src/lib/core/entities';

@Component({
    selector: 'sf-configured-channel',
    template: ' ',
})
export class ConfiguredChannelStubComponent {

    @Input() channel: StoreChannel;

}
