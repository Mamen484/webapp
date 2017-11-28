import { Component, Input } from '@angular/core';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';
import { TimelineEventFormatted } from '../../core/entities/timeline-event-formatted';

@Component({
    selector: 'sf-event-link',
    templateUrl: './event-link.component.html',
    styleUrls: ['./event-link.component.scss']
})
export class EventLinkComponent {


    @Input() event: TimelineEventFormatted;
    actions = TimelineEventAction;
    names = TimelineEventName;

    constructor() {
    }

    getLink() {
        switch (this.event.type) {
            case this.names.orderLifecycle:
                return `/marketplaces/orders/${this.event.reference}`;
            case this.names.ruleSegmentation:
                return `/tools/segmentations#${this.event.reference}`;
            case this.names.ruleTransformation:
                return `/tools/rules#${this.event.reference}`;
        }
    }

}
