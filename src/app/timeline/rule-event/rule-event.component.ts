import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventOperation } from '../../core/entities/timeline-event-operation.enum';

@Component({
    selector: 'sf-rule-event',
    templateUrl: './rule-event.component.html',
    styleUrls: ['./rule-event.component.scss']
})
export class RuleEventComponent implements OnInit {

    @Input() ruleName: string;
    @Input() operation: TimelineEventOperation;

    operations = TimelineEventOperation;

    constructor() {
    }

    ngOnInit() {
    }

}
