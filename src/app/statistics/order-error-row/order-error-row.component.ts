import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sf-order-error-row',
    templateUrl: './order-error-row.component.html',
    styleUrls: ['./order-error-row.component.scss']
})
export class OrderErrorRowComponent implements OnInit {

    @Input() channelName: string;
    @Input() reference: string;

    constructor() {
    }

    ngOnInit() {
    }

}
