import { Component, Input } from '@angular/core';
import { TimelineEventName } from '../../../../projects/sfl-shared/lib/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../../../projects/sfl-shared/lib/entities/timeline-event-action.enum';
import { TimelineEvent } from '../../../../projects/sfl-shared/lib/entities/timeline-event';

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
