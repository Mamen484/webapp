import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';

@Component({
    selector: 'sf-rule-event',
    templateUrl: './rule-event.component.html',
    styleUrls: ['./rule-event.component.scss']
})
export class RuleEventComponent implements OnInit {

    @Input() ruleName: string;
    @Input() operation: TimelineEventAction;

    operations = TimelineEventAction;

    constructor() {
    }

    ngOnInit() {
    }

}
