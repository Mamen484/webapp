import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'sf-search-channels',
    template: ' ',
})
export class SearchChannelsStubComponent {

    @Output() applyFilter = new EventEmitter();
    @Input() processing = false;

}
