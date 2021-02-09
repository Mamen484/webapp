import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'sfl-shared/entities';

@Component({
    selector: 'sf-recommended-channels-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

    @Input() channels: Channel[] = [];
    @Input() country = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
