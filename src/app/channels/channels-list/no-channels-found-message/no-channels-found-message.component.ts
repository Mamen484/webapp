import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'sf-no-channels-found-message',
    templateUrl: './no-channels-found-message.component.html',
    styleUrls: ['./no-channels-found-message.component.scss']
})
export class NoChannelsFoundMessageComponent implements OnInit {

    @Input() query = '';
    @Output() clearSearch = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

}
