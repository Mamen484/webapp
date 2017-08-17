import { Component, Input } from '@angular/core';
import { Statistics } from '../../app/core/entities/statistics';

@Component({
    selector: 'sf-store-statistics',
    template: '',
})
export class StoreStatisticsStubComponent {

    @Input() statistics: Statistics;

}
