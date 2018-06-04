import { Component, Input } from '@angular/core';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';
import { TimelineEvent } from '../../core/entities/timeline-event';

@Component({
    selector: 'sf-update-row',
    templateUrl: './update-row.component.html',
    styleUrls: ['./update-row.component.scss']
})
export class UpdateRowComponent {

    @Input() update: TimelineEvent;

    names = TimelineEventName;
    actions = TimelineEventAction;

    constructor() {
    }
}
