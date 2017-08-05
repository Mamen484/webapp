import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from '../../core/entities/statistics';

@Component({
    selector: 'sf-store-statistics',
    templateUrl: './store-statistics.component.html',
    styleUrls: ['./store-statistics.component.scss']
})
export class StoreStatisticsComponent implements OnInit {

    @Input() statistics: Statistics;

    constructor() {
    }

    ngOnInit() {
    }

}
