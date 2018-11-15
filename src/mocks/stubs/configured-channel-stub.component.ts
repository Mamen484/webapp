import { Component, Input } from '@angular/core';
import { StoreChannel } from 'sfl-shared/entities';

@Component({
    selector: 'sf-configured-channel',
    template: ' ',
})
export class ConfiguredChannelStubComponent {

    @Input() channel: StoreChannel;

}
