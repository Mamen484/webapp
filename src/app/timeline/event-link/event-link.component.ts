import { Component, Input } from '@angular/core';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';
import { TimelineEventFormatted } from '../../core/entities/timeline-event-formatted';
import { TimelineUpdateName } from '../../core/entities/timeline-update-name.enum';
import { Channel } from '../../core/entities/channel';

@Component({
    selector: 'sf-event-link',
    templateUrl: './event-link.component.html',
    styleUrls: ['./event-link.component.scss']
})
export class EventLinkComponent {


    @Input() event: TimelineEventFormatted;
    actions = TimelineEventAction;
    names = TimelineEventName;
    updateNames = TimelineUpdateName;

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

    getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

}
