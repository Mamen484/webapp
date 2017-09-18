import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChannelsRequestParams } from '../../app/core/entities/channels-request-params';

@Component({
    selector: 'sf-search-channels',
    template: ' ',
})
export class SearchChannelsStubComponent {

    @Output() applyFilter = new EventEmitter();
    @Input() processing = false;
    @Input() filter: ChannelsRequestParams;

}
