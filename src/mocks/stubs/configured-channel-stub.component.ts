import { Component, Input } from '@angular/core';
import { StoreChannel } from '../../app/core/entities/store-channel';

@Component({
    selector: 'sf-configured-channel',
    template: ' ',
})
export class ConfiguredChannelStubComponent {

    @Input() channel: StoreChannel;

}
