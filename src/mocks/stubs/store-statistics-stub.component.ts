import { Component, Input } from '@angular/core';
import { Statistics } from 'sfl-shared/entities';

@Component({
    selector: 'sf-store-statistics',
    template: ' ',
})
export class StoreStatisticsStubComponent {

    @Input() statistics: Statistics;

}
